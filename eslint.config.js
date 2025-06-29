import eslint from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import functionalPlugin from 'eslint-plugin-functional'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default [
  eslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: ['./tsconfig.json', './packages/*/tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
      functional: functionalPlugin,
      prettier: prettierPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json', './packages/*/tsconfig.json'],
        },
      },
    },
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/prefer-readonly': 'error',

      // Functional programming rules
      'functional/no-let': 'error',
      'functional/no-loop-statements': 'error',
      'functional/prefer-readonly-type': 'error',
      'functional/no-this-expressions': 'error',

      // Import rules
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-duplicates': 'error',
      'import/no-cycle': 'error',
      'import/no-unused-modules': 'error',

      // General rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-body-style': ['error', 'as-needed'],

      // Prettier integration
      'prettier/prettier': 'error',
    },
  },
  // Test files overrides
  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    rules: {
      'functional/no-expression-statements': 'off',
      'functional/no-return-void': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
    },
  },
  // Config files overrides
  {
    files: ['*.config.ts', '*.config.js', 'eslint.config.js'],
    rules: {
      'functional/no-expression-statements': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  // Prettier config to disable conflicting rules
  prettierConfig,
  // Ignore patterns
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      'coverage',
      '*.min.js',
      '*.d.ts',
    ],
  },
]
