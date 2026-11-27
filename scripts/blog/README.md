# Blog drafting pipeline (newral.in)

Claude drafts articles from the keyword plan; a person reviews and approves
each one. Nothing is published, committed, pushed or deployed automatically.

```
docs/seo/blog-queue.json ──draft──▶ content/blog-drafts/<slug>.json + .review.md
                                         │  (outside src/: never built)
                              person reads, edits, fact-checks
                                         │
                         npm run blog:approve -- <slug>
                                         ▼
                              src/data/posts/<slug>.json  (loaded by src/data/blog.js)
                                         │
                     npm run build → commit → deploy (as usual, by a person)
```

## Commands

```
npm run blog:draft                       # draft the next queued topic
npm run blog:draft -- --count 2          # the next two
npm run blog:draft -- --slug <slug>      # one specific topic
npm run blog:draft -- --dry-run          # show the prompt; no Claude call
npm run blog:approve -- <slug>           # publish a reviewed draft into src/data/posts/
npm run blog:approve -- <slug> --author founder   # credit Yash (only if he reviewed it)
```

## How Claude is called
`scripts/blog/claude.mjs` runs the local `claude` CLI with the operator's
existing Claude Code login, exactly like Harvey's `ask_claude`: no API key, no
tools, no MCP, none of your CLAUDE.md, hooks, skills or settings, no saved
transcript, prompt on stdin, fresh temp folder. If the CLI is missing an
isolation flag the call is refused. A draft takes a few minutes.

## What keeps drafts honest
- `scripts/blog/brief.md` is the only source of facts the prompt includes. Edit it when the product notes change.
- `scripts/blog/lint.mjs` blocks Synappses/LMS mentions, disallowed client names, prices, superlatives and links to pages that do not exist, and lists every sentence with a number or a client name for a human to check. `approve` re-runs it and refuses on errors (override with `--force`).

## Adding topics
Add an entry to `docs/seo/blog-queue.json` (see `docs/seo/KEYWORD-PLAN.md`). One
topic per keyword; `supports` must be an existing page.

## Running it on a schedule (optional, you set it up)
Nothing is scheduled by default. To draft one article every Monday on Windows,
run this once in PowerShell from the repo folder (it only creates drafts on
this PC; you still review and approve them):

```powershell
$repo = (Get-Location).Path
$action = New-ScheduledTaskAction -Execute "cmd.exe" -Argument "/c cd /d `"$repo`" && npm run blog:draft >> content\blog-drafts\draft.log 2>&1"
$trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Monday -At 10am
Register-ScheduledTask -TaskName "Newral blog draft" -Action $action -Trigger $trigger
```
