import { FlatCompat } from '@eslint/eslintrc';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({
  baseDirectory: resolve(__dirname)
});

export default [
  ...compat.extends(['google', 'plugin:prettier/recommended']),
  {
    files: ['**/*.js'],
    ignores: [ 'node_modules', 'dist', 'build' ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'require-jsdoc': 'off', // Disable JSDoc requirement for all functions
      'no-console': 'warn',   // Allow console statements but show warnings
      'indent': ['error', 2], // Enforce 2-space indentation,
      'valid-jsdoc': 'off',
    },
  },
];
