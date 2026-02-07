// eslint.config.mjs
import { defineConfig } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import unicorn from "eslint-plugin-unicorn";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    plugins: {
      import: importPlugin,
      unicorn,
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
    rules: {
      "import/no-unresolved": ["error", { caseSensitive: true }],
      "unicorn/filename-case": ["error", { case: "pascalCase" }],
    },
  },

  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
]);
