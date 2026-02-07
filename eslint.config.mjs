import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import importPlugin from "eslint-plugin-import";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    plugins: {
      import: importPlugin,
    },

    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },

    rules: {
      /**
       * 🔥 THIS IS THE MONEY RULE
       * Catches:
       * - wrong casing
       * - typos
       * - missing files
       * (exactly what broke Vercel)
       */
      "import/no-unresolved": ["error", { caseSensitive: true }],

      /**
       * Extra safety
       */
      "import/named": "error",
      "import/default": "error",
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
