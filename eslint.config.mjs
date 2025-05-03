import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "sort-imports": ["error", {"ignoreCase": true, "ignoreDeclarationSort": true}],
      "arrow-body-style": ["error", "as-needed"],
      "arrow-parens": ["error", "always"],
      "arrow-spacing": ["error", { "before": true, "after": true }],
      "no-var": "error",
      "object-shorthand": ["error", "always"],
      "prefer-arrow-callback": "error",
      "prefer-const": "error",
      "prefer-destructuring": ["error", { "array": true, "object": true }],
      "prefer-rest-params": "error",
      "prefer-spread": "error",
      "prefer-template": "error",
      "template-curly-spacing": ["error", "never"],
      "no-duplicate-imports": "error",
      "no-useless-constructor": "error",
      "no-useless-rename": "error"
    }
  }
];

export default eslintConfig;
