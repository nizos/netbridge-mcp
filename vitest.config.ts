import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: false,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'dist/**',
        '**/*.d.ts',
        '**/*.config.*',
        '.eslintrc.cjs',
        '**/mockData/**',
        '**/*.test.ts',
        '**/*.spec.ts',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
    include: [
      'apps/*/src/**/*.test.ts',
      'apps/*/src/**/*.spec.ts',
      'domains/*/src/**/*.test.ts',
      'domains/*/src/**/*.spec.ts',
    ],
    exclude: ['node_modules', 'dist', 'coverage'],
  },
})
