# Claude Development Guidelines

This document provides guidelines for AI assistants working on the NetBridge MCP project.

## Project Overview

NetBridge MCP enables AI agents to effectively work with browser network traffic data through a three-component architecture: browser extension, node server, and MCP server.

## Core Development Principles

### Domain-Driven Design (DDD) & Agile Methodology

- **Business behavior first**: Focus on what the system does for users, not technical implementation
- **Value-driven development**: Prioritize features by business value, deliver working software early
- **Vertical slices**: Complete end-to-end functionality before adding breadth
- **MVP mindset**: Establish connections and prove concepts before adding features
- **Emergent design**: Let architecture evolve based on real needs, not speculation
- **Theory of Constraints**: Identify and address bottlenecks that limit value delivery

### Test-Driven Development (TDD)

- **Test-first discipline**: Write exactly one failing test before any implementation
- **Red-Green-Refactor cycle**:
  - Red: Write a failing test that documents expected business behavior
  - Green: Write minimal code to make the test pass
  - Refactor: Improve the code while keeping tests green
- **One test at a time**: Complete the full cycle for each test before starting the next
- **Correct failure reasons**: Tests must fail on assertions, not missing implementations
  - Wrong: "TypeError: point.add is not a function"
  - Right: "AssertionError: expected undefined to be 15"
- **Minimal implementations**: Add only what the current failing test requires
- **Single assertion rule**: Each test verifies exactly one behavior
- **Behavior-focused testing**: Test what the system does, not how it's implemented
- **Black box testing**: Test public APIs only, internal implementation is invisible

### TypeScript & Schema-First Development

- **Zero tolerance for `any`**: Never use `any` types or type assertions - use `unknown` when type is genuinely unknown
- **Schema-first approach**: Define schemas using Zod (or other Standard Schema compliant libraries), then derive types
- **Type preferences**: Always use `type` declarations over `interface`
- **Runtime validation**: Parse all external data through schemas at system boundaries
- **Single source of truth**: Define each schema once, derive types using inference

### Functional Programming & Architecture Patterns

- **Immutability by default**: Data structures are never modified after creation
- **Pure functions only**: Same input always produces same output, no side effects
- **Function composition**: Build complex behavior by composing simple, focused functions
- **Small functions**: Each function does one thing well, typically under 10 lines
- **Flat structure**: Maximum nesting depth of 2 levels, use early returns and guard clauses
- **Event-driven communication**: Decouple components through events and messages
- **Functional core, imperative shell**: Business logic stays pure, I/O at boundaries

### Function Design

- **Options objects by default**: Functions accept a single options object instead of multiple parameters
- **Avoid boolean flags**: Replace with descriptive string unions or separate options
- **Single parameter exceptions**: Only for simple transforms and established patterns (like `map` callbacks)
- **Self-documenting code**: Names and structure should make comments unnecessary

## Project Structure

```
netbridge-mcp/
├── domains/                   # Business capabilities
│   ├── traffic-capture/
│   │   └── src/
│   │       ├── *.ts          # Domain logic
│   │       └── *.test.ts     # Colocated tests
│   ├── traffic-storage/
│   │   └── src/
│   │       ├── *.ts          # Domain logic
│   │       └── *.test.ts     # Colocated tests
│   └── traffic-query/
│       └── src/
│           ├── *.ts          # Domain logic
│           └── *.test.ts     # Colocated tests
├── apps/                      # Deployable applications
│   ├── browser-extension/
│   │   ├── src/
│   │   │   ├── *.ts          # App-specific code
│   │   │   └── *.test.ts     # Colocated tests
│   │   └── package.json
│   ├── node-server/
│   │   ├── src/
│   │   │   ├── *.ts          # App-specific code
│   │   │   └── *.test.ts     # Colocated tests
│   │   └── package.json
│   └── mcp-server/
│       ├── src/
│       │   ├── *.ts          # App-specific code
│       │   └── *.test.ts     # Colocated tests
│       └── package.json
├── shared/                    # Cross-cutting concerns
└── docs/
```

## Testing Guidelines

- **Colocated tests**: Test files are placed next to source files with `.test.ts` or `.spec.ts` suffix
- **Tests define behavior**: Each test documents a specific business requirement
- **Shared code reuse**: Import shared logic from production code, never duplicate in tests
- **Test data factories**: Create functions that generate test data with sensible defaults
- **Override capability**: Allow partial overrides for specific test scenarios
- **Builder pattern**: Consider for very complex test objects
- **Business-focused tests**: Test names describe business value, not technical details
- **Test naming**: Avoid 'should' in test names - use active voice
- **Vertical testing**: Test complete user journeys through the system

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
- **Specific package**: `yarn workspace @netbridge-mcp/[package-name] test`

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
- Tests reuse production code, no duplication

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

## GitHub Issues & Project Management

Use GitHub Issues for tracking business-focused work items (features, bugs, documentation) on the "NetBridge MCP Development" project board (ID: 1). Issues should describe business needs and expected behavior, not implementation details. Continue using TodoWrite/TodoRead for granular task tracking within each issue.

### Issue Workflow

- **Before starting work**: Check existing issues with `gh issue list`
- **Create issues**: When planning reveals significant work items, use structured format:
  - Title: Brief description (e.g., "add network request filtering")
  - Body: Description (why/what), Tasks (checklist), Goal (success criteria)
  - Labels: `feature`, `enhancement`, `bug`, or `documentation`
- **Track progress**: Update task checkboxes and move issues through board columns:
  - When starting: Move to "In Progress" column
  - When complete: Ensure all tasks are checked off before moving to "Done" column
- **Link work**: Reference issues in commits using `#[issue-number]`

### Key Commands

- **Create issue**: `gh issue create --title "..." --body "..." --label "..."`
- **Add to project**: `gh project item-add 1 --owner nizos --url [issue-url]`
- **Update tasks**: `gh issue edit [number] --body "..."`
- **Move to column**: `gh project item-edit --project-id PVT_kwHOAQLxys4A8piC --id [item-id] --field-id PVTSSF_lAHOAQLxys4A8piCzgwlckc --single-select-option-id [option-id]`
  - Todo: `f75ad846`
  - In Progress: `47fc9ee4`
  - Done: `98236657`

## Error Handling

- **Result types**: Make error cases explicit in return types
- **Type-safe errors**: Ensure error handling maintains type safety
- **Early returns**: Handle errors as early as possible
- **Meaningful context**: Provide helpful error messages
- **Parse don't validate**: Use schema parsing for input validation

## Design Philosophy

- **Simplicity over complexity**: Choose the simplest solution that delivers value
- **YAGNI (You Aren't Gonna Need It)**: Build only what's needed now
- **Iterate and learn**: Each iteration provides insights for the next
- **Constraint-driven**: Work within limits to force creative solutions
- **Rapid feedback loops**: Deploy early, test with real usage, adapt quickly

## Key Reminders

- **Security**: Never trust external input, validate everything at boundaries
- **Composition over inheritance**: Build features by composing small functions
- **Dependency injection**: Pass dependencies explicitly
- **Clear boundaries**: Separate business logic from infrastructure

The goal is to create maintainable, testable, and efficient code that enables AI agents to work effectively with browser network data.
