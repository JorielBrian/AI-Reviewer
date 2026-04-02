// ESLint configuration for the AI Reviewer project
// Defines linting rules and ignores for code quality and consistency
// Uses Next.js recommended configurations for React and TypeScript

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals"; // Next.js core web vitals rules
import nextTs from "eslint-config-next/typescript"; // Next.js TypeScript rules

// ESLint configuration array
const eslintConfig = defineConfig([
  ...nextVitals, // Spread Next.js core web vitals configuration
  ...nextTs, // Spread Next.js TypeScript configuration

  // Override default ignores of eslint-config-next
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**", // Next.js build output
    "out/**", // Next.js export output
    "build/**", // Build directory
    "next-env.d.ts", // Next.js type definitions
  ]),
]);

export default eslintConfig;
