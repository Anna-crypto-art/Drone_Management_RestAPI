/**
 * @type {import {  } from "eslint"}
 */
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/essential"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
      legacyDecorators: true
    }
  },
  plugins: ["vue"],
  rules: {
    "no-console": "warn",
    "no-debugger": "warn",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off"
  }
};
