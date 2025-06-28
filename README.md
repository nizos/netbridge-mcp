# Browser Network MCP Solution

A TypeScript-based Model Context Protocol (MCP) solution that enables AI agents to access and analyze browser network traffic effectively. This tool is particularly useful for UI-engine based projects, allowing agents to search and filter through network data without having to read all of it.

## Overview

The Browser Network MCP Solution consists of three main components:

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

