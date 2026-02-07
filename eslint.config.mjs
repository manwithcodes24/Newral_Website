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
      // Still strict
      "import/no-unresolved": ["error", { caseSensitive: true }],
      "react-hooks/unsupported-syntax": "error",

      // Allow development flexibility
      "@typescript-eslint/no-unused-vars": "warn",
      "@next/next/no-img-element": "warn",
    },

  },

  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
]);
