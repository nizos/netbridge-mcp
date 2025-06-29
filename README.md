# NetBridge MCP

> ⚠️ **This project is under active development and not yet ready for production use.**

[![CI](https://github.com/nizos/netbridge-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/nizos/netbridge-mcp/actions/workflows/ci.yml)
[![Security](https://github.com/nizos/netbridge-mcp/actions/workflows/security.yml/badge.svg)](https://github.com/nizos/netbridge-mcp/actions/workflows/security.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Enables AI agents to access and analyze browser network traffic effectively. This tool is particularly useful for UI-engine based projects, allowing agents to search and filter through network data without having to read all of it.

## Project Structure

This project uses a monorepo structure with Yarn workspaces:

```
netbridge-mcp/
├── packages/
│   ├── browser-extension/   # Chrome/Firefox extension
│   ├── node-server/        # WebSocket middleware server
│   └── mcp-server/         # MCP protocol server
├── shared/
│   ├── schemas/            # Shared Zod schemas
│   └── types/              # Derived TypeScript types
└── docs/                   # Documentation
```

## Overview

NetBridge MCP consists of three main components:

### 1. Browser Extension

A Chrome/Firefox extension that captures network traffic from the browser, including:

- HTTP/HTTPS requests and responses
- Request/response headers
- Request/response bodies
- Timing information
- Status codes and error details

### 2. Node Server (Middleware)

A Node.js server that facilitates communication between the browser extension and the MCP server:

- WebSocket connection to receive data from the browser extension
- Data processing and formatting
- Communication bridge to the MCP server
- Temporary data storage and caching

### 3. MCP Server

An MCP server that provides tools for AI agents to interact with the captured network data:

- Search and filter network requests
- Analyze request patterns
- Extract specific data from requests/responses
- Provide insights about API usage

## Architecture

```
┌─────────────────┐      WebSocket      ┌──────────────┐      MCP Protocol    ┌────────────┐
│                 │ ◄─────────────────► │              │ ◄──────────────────► │            │
│ Browser         │                     │ Node Server  │                      │ MCP Server │
│ Extension       │                     │ (Middleware) │                      │            │
│                 │                     │              │                      │            │
└─────────────────┘                     └──────────────┘                      └────────────┘
```

## Use Cases

- **API Debugging**: Analyze API calls made by web applications
- **Performance Analysis**: Identify slow or failing network requests
- **Security Auditing**: Review network traffic for security issues
- **UI Testing**: Verify that UI actions trigger the correct network requests
- **Data Extraction**: Extract specific data from network responses

## Development Setup

### Prerequisites

- Node.js >= 22.0.0
- Yarn 1.22.x

### Installation

```bash
# Clone the repository
git clone https://github.com/nizos/netbridge-mcp.git
cd netbridge-mcp

# Install dependencies
yarn install
```

### Development Commands

```bash
# Run tests
yarn test              # Run all tests
yarn test:watch        # Run tests in watch mode
yarn test:coverage     # Run tests with coverage

# Type checking
yarn type-check        # Check TypeScript types across all packages

# Build
yarn build            # Build all packages

# Package-specific commands
yarn workspace @netbridge-mcp/browser-extension test
yarn workspace @netbridge-mcp/node-server dev
yarn workspace @netbridge-mcp/mcp-server dev
```
