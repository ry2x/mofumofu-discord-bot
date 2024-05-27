import { FlatCompat } from '@eslint/eslintrc';
import eslintJS from '@eslint/js';
import typeScriptESLint from '@typescript-eslint/eslint-plugin';
import typeScriptESLintParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintImport from 'eslint-plugin-import';
import eslintImportUsage from 'eslint-plugin-unused-imports';

const compat = new FlatCompat();

export default [
  eslintJS.configs.recommended,
  eslintConfigPrettier,
  ...compat.extends(
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ),
  {
    files: ['**/*.ts'],
    ignores: ['**/*.config.js'],
    plugins: {
      typeScriptESLint,
      eslintImport,
      eslintImportUsage,
    },
    languageOptions: {
      globals: {
        commonjs: true,
        es2021: true,
        node: true,
        client: 'writable',
      },
      parser: typeScriptESLintParser,
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'eslintImportUsage/no-unused-imports': 'warn',
      'eslintImport/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
          },
        },
      ],
    },
  },
];
