import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // infra/ holds CloudFront Function code, which runs in its own runtime.
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "infra/**"]),
]);

export default eslintConfig;
