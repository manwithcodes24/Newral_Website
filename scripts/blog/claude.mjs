// One isolated, tool-less Claude call through the operator's own Claude Code
// login (subscription or whatever `claude login` set up). No API key is read
// or needed. Same isolation as harvey/*/harvey/claude_runtime.py:
//
//   --safe-mode, --setting-sources "", --tools "", --strict-mcp-config,
//   --disable-slash-commands, --no-session-persistence
//
// so the operator's CLAUDE.md, hooks, skills, plugins, MCP servers and
// settings never reach the prompt, nothing is written to their transcripts,
// and the model has no tools to act with. The prompt goes on stdin (never in
// argv), the call runs in a fresh empty temp directory, and variables that
// would tie it to an enclosing Claude Code session are removed.
//
// If the installed CLI does not list every isolation flag in `--help`, the
// call is refused: there is no fallback to an unisolated call.
//
// Kept identical in Newral_Website and Mainlandingpage: change both.

import { spawn, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const REQUIRED_FLAGS = [
  '--safe-mode',
  '--setting-sources',
  '--no-session-persistence',
  '--disable-slash-commands',
  '--strict-mcp-config',
  '--tools',
  '--output-format',
]

const STRIPPED_ENV = [
  'CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD',
  'CLAUDE_CODE_SIMPLE',
  'CLAUDE_CODE_ENTRYPOINT',
  'CLAUDE_CODE_SSE_PORT',
  'CLAUDE_ENV_FILE',
  'CLAUDE_PROJECT_DIR',
  'CLAUDECODE',
  'OLDPWD',
]

const IS_WIN = process.platform === 'win32'
const MIN_NATIVE_BYTES = 4096

function isFile(p) {
  try {
    return fs.statSync(p).isFile()
  } catch {
    return false
  }
}

// A Windows npm shim (claude.cmd) would run through cmd.exe, which re-parses
// the empty-string flags (--tools ""). Resolve it to the claude.exe it wraps.
function shimTarget(shim) {
  let text = ''
  try {
    text = fs.readFileSync(shim, 'utf8')
  } catch {}
  const m = text.match(/"(?:%~?dp0%?\\)?((?:[A-Za-z]:\\)?[^"%]*?\bclaude\.exe)"/i)
  if (m) {
    const t = m[1]
    return /^[A-Za-z]:\\/.test(t) ? t : path.join(path.dirname(shim), t)
  }
  return path.join(path.dirname(shim), 'node_modules', '@anthropic-ai', 'claude-code', 'bin', 'claude.exe')
}

export function findClaude() {
  if (process.env.CLAUDE_BIN) return process.env.CLAUDE_BIN
  const dirs = (process.env.PATH || '').split(path.delimiter).filter(Boolean)
  const names = IS_WIN ? ['claude.exe', 'claude.cmd', 'claude.bat'] : ['claude']
  for (const dir of dirs) {
    for (const name of names) {
      const p = path.join(dir, name)
      if (!isFile(p)) continue
      if (!/\.(cmd|bat)$/i.test(p)) return p
      const native = shimTarget(p)
      if (isFile(native) && fs.statSync(native).size >= MIN_NATIVE_BYTES) return native
      throw new Error(`Found ${p}, but the claude.exe it wraps (${native}) is missing. Reinstall Claude Code.`)
    }
  }
  throw new Error('Claude CLI not found on PATH. Install Claude Code and run `claude login`, or set CLAUDE_BIN.')
}

function runtimeEnv(cwd) {
  const env = { ...process.env }
  for (const k of STRIPPED_ENV) delete env[k]
  env.PWD = cwd
  env.CLAUDE_CODE_SAFE_MODE = '1'
  return env
}

function withTempDir(fn) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-claude-'))
  const done = () => {
    try {
      fs.rmSync(dir, { recursive: true, force: true })
    } catch {}
  }
  return fn(fs.realpathSync(dir)).finally(done)
}

export function checkCli(exe) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-claude-help-'))
  try {
    const out = spawnSync(exe, ['--help'], { cwd: dir, env: runtimeEnv(dir), encoding: 'utf8', timeout: 30_000 })
    if (out.status !== 0) throw new Error(`'${exe} --help' failed (exit ${out.status}). No prompt was sent.`)
    const help = `${out.stdout || ''}${out.stderr || ''}`
    const missing = REQUIRED_FLAGS.filter((f) => !new RegExp(`(?<![\\w-])${f.replace(/-/g, '\\-')}(?![\\w-])`).test(help))
    if (missing.length) {
      throw new Error(`This Claude CLI lacks ${missing.join(', ')}; run 'claude update'. No prompt was sent.`)
    }
  } finally {
    try {
      fs.rmSync(dir, { recursive: true, force: true })
    } catch {}
  }
}

/**
 * Send `prompt` to Claude and return the text of its answer.
 * @param {string} prompt
 * @param {{ model?: string, timeoutMs?: number }} [opts]
 */
export async function askClaude(prompt, { model = '', timeoutMs = 15 * 60_000 } = {}) {
  const exe = findClaude()
  checkCli(exe)
  const args = [
    '-p',
    '--output-format', 'json',
    '--tools', '',
    '--strict-mcp-config',
    '--safe-mode',
    '--setting-sources', '',
    '--disable-slash-commands',
    '--no-session-persistence',
  ]
  if (model) args.push('--model', model)

  return withTempDir(
    (cwd) =>
      new Promise((resolve, reject) => {
        const child = spawn(exe, args, { cwd, env: runtimeEnv(cwd), stdio: ['pipe', 'pipe', 'pipe'], windowsHide: true })
        let stdout = ''
        let stderr = ''
        const timer = setTimeout(() => {
          child.kill()
          reject(new Error(`Claude timed out after ${Math.round(timeoutMs / 1000)}s`))
        }, timeoutMs)
        child.stdout.setEncoding('utf8').on('data', (d) => (stdout += d))
        child.stderr.setEncoding('utf8').on('data', (d) => (stderr += d))
        child.on('error', (e) => {
          clearTimeout(timer)
          reject(e)
        })
        child.on('close', (code) => {
          clearTimeout(timer)
          if (code !== 0) return reject(new Error(`claude exited ${code}: ${(stderr || stdout).slice(0, 400)}`))
          try {
            const parsed = JSON.parse(stdout)
            if (parsed.is_error) return reject(new Error(`claude returned an error: ${String(parsed.result).slice(0, 400)}`))
            resolve(String(parsed.result ?? ''))
          } catch {
            reject(new Error(`Could not parse Claude CLI output: ${stdout.slice(0, 300)}`))
          }
        })
        child.stdin.end(prompt, 'utf8')
      })
  )
}

/** Pull the first JSON object out of a model answer (tolerates ``` fences). */
export function extractJson(text) {
  const t = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')
  try {
    return JSON.parse(t)
  } catch {}
  const start = t.indexOf('{')
  const end = t.lastIndexOf('}')
  if (start >= 0 && end > start) return JSON.parse(t.slice(start, end + 1))
  throw new Error('Claude did not return a JSON object')
}
