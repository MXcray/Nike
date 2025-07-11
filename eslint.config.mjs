// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import globals from "globals";
// const globals = require("globals")
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintReactHooks from "eslint-plugin-react-hooks";
import eslintReactRefresh from "eslint-plugin-react-refresh";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from 'eslint-config-prettier'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default tseslint.config({
  plugins: {
    '@typescript-eslint': tseslint.plugin,
    'react-hooks': eslintReactHooks,
    'react': pluginReact,
    'react-refresh': eslintReactRefresh,
    // prettier: prettierPlugin
  }
}, {
  ignores: ['node_modules', 'dist', 'eslint.config.mjs']
}, pluginJs.configs.recommended, ...tseslint.configs.recommended, {
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.browser,
      ...globals.es2022,
    },
    // parserOptions: pluginReact.configs.recommended.parserOptions
    parserOptions: [
      'tsconfig.json',
      'tsconfig.node.json'
    ]
  }
}, // {
//   files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]
// },
// {
//   languageOptions: {
//     globals: globals.browser
//   }
// },
// {
//   extends: ['eslint:recommended']
// },
// pluginJs.configs.recommended,
// ...tseslint.configs.recommended,
// pluginReact.configs.flat.recommended,
{
  files: ['**/*.{js,jsx,ts,tsx}'],
  rules: {
    // ...prettierPlugin.configs.recommended.rules,
    ...eslintConfigPrettier.rules,
    'max-len': ['error', { code: 120, ignoreComments: true }],
    'no-unused-vars': 'warn',
    'react/jsx-max-props-per-line': ['warn', { maximum: 3 }],
    // 'object-curly-newline': 'off',
    'object-curly-spacing': ['error', 'always'],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'react/display-name': 'off',
    'number-leading-zero': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-tabs': 0,
    // 'object-curly-newline': ['warn', {
    //   ObjectPattern: { multiline: true },
    // }],
    // "object-curly-newline": ["error", {
    //   "ObjectExpression": "always",
    //   "ObjectPattern": { "multiline": true },
    //   "ImportDeclaration": "never",
    //   "ExportDeclaration": { "multiline": true, "minProperties": 3 }
    // }]
  }
}, storybook.configs["flat/recommended"]);