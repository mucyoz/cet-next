import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // This spread operator brings in the Next.js recommended rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // vvv ADD THIS OBJECT TO OVERRIDE RULES vvv
  {
    rules: {
      // This will turn the 'no-explicit-any' rule off for your entire project
      "@typescript-eslint/no-explicit-any": "off",

      // You can add other custom rule overrides here as well
      // "another-rule-name": "warn",
    },
  },
  // ^^^ END OF THE ADDED OBJECT ^^^
];

export default eslintConfig;
