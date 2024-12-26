import nextPlugin from '@next/eslint-plugin-next';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    ignores: ['**/node_modules/*', '**/dist/*'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@next/next': nextPlugin,
      import: importPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      // TypeScript strict
      '@typescript-eslint/no-explicit-any': 'error',
      // '@typescript-eslint/explicit-function-return-type': [
      //   'error',
      //   {
      //     allowExpressions: true,
      //     allowTypedFunctionExpressions: true,
      //   },
      // ],
      // '@typescript-eslint/explicit-module-boundary-types': 'error',
      // '@typescript-eslint/no-unsafe-assignment': 'error',
      // '@typescript-eslint/no-unsafe-call': 'error',
      // '@typescript-eslint/no-unsafe-member-access': 'error',
      // '@typescript-eslint/no-unsafe-return': 'error',

      // Types declaration
      // '@typescript-eslint/typedef': [
      //   'error',
      //   {
      //     arrowParameter: true,
      //     variableDeclaration: true,
      //     parameter: true,
      //   },
      // ],

      // Imports
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/namespace': 'error',
      'import/default': 'error',
      'import/export': 'error',

      // Clean code
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      // '@typescript-eslint/strict-boolean-expressions':,
      '@typescript-eslint/no-floating-promises': 'error',

      // Next.js
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'error',
    },
  },
  prettierConfig,
];
