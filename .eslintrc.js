module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "react",
    "eslint-plugin-tsdoc",
    "react-perf",
    "react-hooks",
  ],
  parserOptions: {
    ecmaFeatures: {
      ecmaVersion: 2020,
      jsx: true,
      sourceType: "module",
    },
  },
  rules: {
    semi: "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
  settings: { react: { version: "detect" } },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react/recommended",
    // "plugin:react-perf/recommended",
  ],
};
