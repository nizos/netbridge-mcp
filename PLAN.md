# NetBridge MCP Strategic Development Plan

## Project Context

The goal of this project is to allow AI agents to access network data in the browser in an effective manner. Instead of receiving all data at once (which can overload the AI's context window), we provide the agent with smart and effective tools that allow it to search for and find the specific network data it needs. We will use filtering and search capabilities (inspired by tools like grep, jq) to process responses on behalf of the agent, preventing token overflow in its context window.

## Development Philosophy

- **Agile methodology**: Prioritize by value and achieve a working prototype ASAP
- **Test-Driven Development (TDD)**: Tests define behavior before implementation
- **Domain-Driven Design (DDD)**: Focus on business needs and behavior
- **Functional programming**: Pure functions, immutability, composition
- **Simplicity first**: Avoid over-engineering and excessive upfront design
- **Emergent design**: Allow architecture to evolve organically based on insights
- **GitHub Issues & Projects**: Track progress with business-focused issues

## Domain Understanding

NetBridge MCP bridges the gap between browser network traffic and AI agents. The core challenge is that raw network data can overwhelm AI context windows. Our solution provides intelligent filtering and search capabilities through smart data structures and tools, allowing agents to precisely query the data they need without drowning in tokens.

## High-Level Architecture Strategy

### 1. Three-Component Architecture

- **Browser Extension**: Captures network traffic in real-time
- **Node Server**: Acts as a WebSocket bridge and data processor
- **MCP Server**: Exposes filtered data to AI agents via standardized protocol

### 2. Data Flow

```
Browser → Extension → WebSocket → Node Server → Processing → MCP Server → AI Agent
```

## Development Strategy (Agile, Value-First)

Our strategy follows the principle of "establish a connection as soon as possible" - we want a working prototype before adding bells and whistles. Each phase delivers immediate value while building toward the complete solution.

### Phase 1: Establish Basic Connection (MVP)

**Goal**: Prove the architecture works end-to-end

1. Simple browser extension that captures one type of request
2. Basic WebSocket connection to Node server
3. Minimal MCP server that exposes captured data
4. Single tool: "get-last-request"

### Phase 2: Smart Filtering

**Goal**: Prevent context overflow

1. Add request filtering by URL pattern, method, status
2. Implement pagination for large result sets
3. Add time-based filtering
4. Tools: "search-requests", "filter-by-criteria"

### Phase 3: Intelligent Search

**Goal**: Enable precise data discovery

1. Full-text search in request/response bodies
2. JSONPath/JQ-like queries for JSON responses
3. Pattern matching for headers and cookies
4. Tools: "search-content", "query-json", "analyze-patterns"

### Phase 4: Advanced Features

**Goal**: Professional-grade capabilities

1. Request grouping and aggregation
2. Performance metrics and analysis
3. Security scanning (CORS, CSP violations)
4. Export capabilities

## Technical Design Principles

### 1. Schema-First Development

- Define Zod schemas for all data structures in `/shared/schemas/`
- Derive TypeScript types from schemas
- Validate all data at system boundaries

### 2. Functional Core, Imperative Shell

- Pure functions for data transformation
- Side effects isolated to system boundaries
- Composable filter and search operations

### 3. Event-Driven Communication

- Browser Extension → Node: Network events
- Node → MCP: Processed data updates
- MCP → AI: On-demand queries

### 4. Data Structure Design

```typescript
// Core domain model
type NetworkRequest = {
  id: string
  timestamp: number
  method: HttpMethod
  url: string
  headers: Record<string, string>
  body?: unknown
  response?: NetworkResponse
}

// Efficient indexing for search
type RequestIndex = {
  byUrl: Map<string, Set<string>>
  byMethod: Map<HttpMethod, Set<string>>
  byStatus: Map<number, Set<string>>
  byTimeRange: IntervalTree<string>
}
```

## Initial GitHub Issues (Phase 1)

Following our philosophy of focusing on business needs and behavior rather than technical details, these issues describe what the system should do, not how it's implemented. Each issue now focuses on domain capabilities rather than technical components.

### 1. Define Core Domain Models (#13)

- Create NetworkRequest and NetworkResponse models
- Define essential value objects (HttpMethod, Headers)
- Models emerge from use cases, not upfront design
- Include validation as domain logic

### 2. Implement Traffic Capture Domain (#14)

- Define what "capturing traffic" means in business terms
- Implement capture service with pure business logic
- Browser extension becomes thin adapter
- Separate transport from capture logic

### 3. Implement Traffic Storage Domain (#15)

- Define storage concepts and policies
- Implement memory-based repository
- Create indexing for efficient retrieval
- Transport infrastructure kept separate

### 4. Implement Agent Interface Domain (#16)

- Define how AI agents interact with traffic data
- Implement "get-last-request" as domain operation
- MCP server becomes thin protocol adapter
- Focus on AI-friendly response formatting

### 5. Implement Traffic Query Domain (#19)

- Define query and filter concepts
- Create composable query operations
- Support for finding last request
- Foundation for future search capabilities

### 6. End-to-End Integration Test (#17)

- Verify complete domain integration
- Test data flow through all domains
- Validate infrastructure adapters
- Document setup process

## Success Metrics

1. **Phase 1**: AI agent can retrieve the last network request
2. **Phase 2**: Agent can search without context overflow
3. **Phase 3**: Agent can extract specific data from responses
4. **Phase 4**: Production-ready for debugging and analysis

## Next Steps

1. Create GitHub issues for Phase 1 features ✓
2. Restructure project for DDD ✓
3. Begin with domain models (test-first)
4. Implement domains incrementally
5. Keep infrastructure adapters thin
6. Focus on vertical slices within domains

This approach prioritizes:

- Early validation of architecture
- Iterative value delivery
- Simple, extensible design that's easy to work with and extend
- Avoiding over-engineering and excessive upfront design
- Maintaining development velocity
- Organic, emergent design based on insights gained during development
- Business behavior over technical implementation details
