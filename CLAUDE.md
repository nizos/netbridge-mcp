# Claude Development Guidelines

This document provides guidelines for AI assistants working on the Browser Network MCP Solution project.

## Project Overview

The Browser Network MCP Solution enables AI agents to effectively work with browser network traffic data through a three-component architecture: browser extension, node server, and MCP server.

## Core Development Principles

### 1. Test-Driven Development (TDD)

- **Tests always come first**: Write failing tests before any implementation code - no exceptions
- **Red-Green-Refactor cycle**:
  - Red: Write a failing test that documents expected business behavior
  - Green: Write minimal code to make the test pass
  - Refactor: Improve the code while keeping tests green
- **Behavior-focused testing**: Test what the system does, not how it's implemented
- **Black box testing**: Test public APIs only, internal implementation is invisible

### 2. TypeScript & Schema-First Development

- **Zero tolerance for `any`**: Never use `any` types or type assertions - use `unknown` when type is genuinely unknown
- **Schema-first approach**: Define schemas using Zod (or other Standard Schema compliant libraries), then derive types
- **Type preferences**: Always use `type` declarations over `interface`
- **Runtime validation**: Parse all external data through schemas at system boundaries
- **Single source of truth**: Define each schema once, derive types using inference

### 3. Functional Programming Patterns

- **Immutability by default**: Data structures are never modified after creation
- **Pure functions only**: Same input always produces same output, no side effects
- **Function composition**: Build complex behavior by composing simple, focused functions
- **Small functions**: Each function does one thing well, typically under 10 lines
- **Flat structure**: Maximum nesting depth of 2 levels, use early returns and guard clauses

### 4. Function Design

- **Options objects by default**: Functions accept a single options object instead of multiple parameters
- **Avoid boolean flags**: Replace with descriptive string unions or separate options
- **Single parameter exceptions**: Only for simple transforms and established patterns (like `map` callbacks)
- **Self-documenting code**: Names and structure should make comments unnecessary

## Project Structure

```
browser-network/
├── packages/
│   ├── browser-extension/
│   │   ├── src/
│   │   │   ├── *.ts         # Source files
│   │   │   └── *.test.ts    # Colocated test files
│   │   └── package.json
│   ├── node-server/
│   │   ├── src/
│   │   │   ├── *.ts         # Source files
│   │   │   └── *.test.ts    # Colocated test files
│   │   └── package.json
│   └── mcp-server/
│       ├── src/
│       │   ├── *.ts         # Source files
│       │   └── *.test.ts    # Colocated test files
│       └── package.json
├── shared/
│   ├── schemas/        # Shared Zod schemas
│   └── types/          # Derived TypeScript types
└── docs/
```

## Testing Guidelines

- **Colocated tests**: Test files are placed next to source files with `.test.ts` or `.spec.ts` suffix
- **Tests define behavior**: Each test documents a specific business requirement
- **Real schemas only**: Import schemas from production code, never redefine in tests
- **Test data factories**: Create functions that generate test data with sensible defaults
- **Override capability**: Allow partial overrides for specific test scenarios
- **Builder pattern**: Consider for very complex test objects

## Development Workflow

### Initial Setup

1. **Install dependencies**: Run `yarn install` from the root directory
2. **Verify setup**: Run `yarn test` to ensure all tests pass
3. **Type checking**: Run `yarn type-check` to verify TypeScript configuration

### TDD Process

1. **Start with behavior**: Define what the system should do, not how
2. **Write failing test**: Create test that describes desired behavior
3. **Minimal implementation**: Write just enough code to pass the test
4. **Refactor if valuable**: Improve code structure while keeping tests green
5. **Iterate**: Repeat cycle for next behavior

### Running Tests

- **All tests**: `yarn test`
- **Watch mode**: `yarn test:watch`
- **Coverage**: `yarn test:coverage`
- **Specific package**: `yarn workspace @browser-network/[package-name] test`

### Code Quality Checks

- **Run all checks**: `yarn check` (type-check, lint, format, test)
- **Type checking**: `yarn type-check`
- **Linting**: `yarn lint` (auto-fix: `yarn lint:fix`)
- **Formatting**: `yarn format` (check only: `yarn format:check`)
- **Fix issues**: `yarn check:fix` (format and lint:fix)

### Pre-commit Hooks

The project uses husky and lint-staged to ensure code quality before commits:

- **Automatic formatting**: Prettier formats all staged files
- **Linting**: ESLint checks and fixes TypeScript files
- **Commit message validation**: Enforces conventional commit format

### Code Review Checklist

- All behaviors have corresponding tests
- No `any` types or unsafe assertions
- All data remains immutable
- Functions are small and pure
- Options objects used for multi-parameter functions
- Tests use real schemas from shared modules

### Commit Guidelines

- **Atomic commits**: Each commit represents one logical change with its tests
- **Test and implementation together**: Never separate tests from the code they test
- **Explain why, not what**: Commit messages should explain the reason for the change
- **Conventional format**: Use prefixes to categorize changes:
  - `feat:` New feature or capability
  - `fix:` Bug fix or error correction
  - `refactor:` Code improvement without changing behavior
  - `test:` Adding missing tests or correcting existing tests
  - `chore:` Maintenance tasks, dependency updates, configuration
  - `docs:` Documentation changes only

**Good commit message**: `feat: add network request filtering to reduce noise in captured data`  
**Poor commit message**: `feat: add filter function to requests.ts`

The message should help future developers understand why this change was necessary, not just describe what files were modified.

## Error Handling

- **Result types**: Make error cases explicit in return types
- **Type-safe errors**: Ensure error handling maintains type safety
- **Early returns**: Handle errors as early as possible
- **Meaningful context**: Provide helpful error messages
- **Parse don't validate**: Use schema parsing for input validation

## Key Reminders

- **Security**: Never trust external input, validate everything at boundaries
- **Composition over inheritance**: Build features by composing small functions
- **Dependency injection**: Pass dependencies explicitly
- **Clear boundaries**: Separate business logic from infrastructure

The goal is to create maintainable, testable, and efficient code that enables AI agents to work effectively with browser network data.
