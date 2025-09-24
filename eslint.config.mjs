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
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
     rules: {
      "@typescript-eslint/no-require-imports": "off", // ✅ disable the rule
       "@typescript-eslint/no-explicit-any": "off",
      // OR to allow only specific cases:
      // "@typescript-eslint/no-require-imports": ["error", { allowConditionalImports: true }]
    },
  },
];

export default eslintConfig;
