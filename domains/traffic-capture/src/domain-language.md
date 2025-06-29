# Traffic Capture Domain Language

This document defines the key concepts and language used in the traffic capture domain.

## Core Concepts

### NetworkRequest

A **NetworkRequest** represents an outgoing HTTP request from a web browser to a server. It captures the essential information needed to understand what data was requested.

Key properties:

- **id**: A unique identifier for tracking this specific request
- **timestamp**: When the request was initiated (milliseconds since epoch)
- **method**: The HTTP verb used (GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS)
- **url**: The complete URL being requested
- **headers**: Key-value pairs of HTTP headers sent with the request
- **body** (optional): The request payload for methods that support it

### NetworkResponse

A **NetworkResponse** represents the server's reply to a NetworkRequest. It contains the data and metadata returned by the server.

Key properties:

- **status**: The HTTP status code (100-599)
- **statusText**: The human-readable status message
- **headers**: Key-value pairs of HTTP headers received in the response
- **body** (optional): The response payload (JSON, text, binary data, etc.)

### HttpMethod

An **HttpMethod** is a standardized verb that indicates the desired action to be performed on a resource. We support the standard HTTP methods as defined in RFC 7231 and RFC 5789.

## Domain Rules

1. **Request Validation**
   - Every request must have a non-empty unique identifier
   - Timestamps must be positive numbers representing valid dates
   - URLs must be non-empty strings
   - Methods must be one of the supported HTTP methods

2. **Response Validation**
   - Status codes must be valid HTTP status codes (100-599)
   - Every response must have a status text description

3. **Immutability**
   - Once created, NetworkRequest and NetworkResponse objects are immutable
   - Any modifications require creating a new object

## Business Value

This domain enables AI agents to:

- Track and analyze web application behavior
- Debug API interactions
- Monitor performance characteristics
- Understand data flow between client and server
- Identify patterns in network traffic

## Usage Example

```typescript
// Capturing a user login request
const loginRequest = createNetworkRequest({
  id: 'req-login-123',
  timestamp: Date.now(),
  method: 'POST',
  url: 'https://api.example.com/auth/login',
  headers: {
    'Content-Type': 'application/json',
  },
  body: { username: 'user@example.com', password: '***' },
})

// The corresponding successful response
const loginResponse = createNetworkResponse({
  status: 200,
  statusText: 'OK',
  headers: {
    'Content-Type': 'application/json',
    'Set-Cookie': 'session=...',
  },
  body: { token: 'jwt...', user: { id: 123, name: 'User' } },
})
```

## Future Considerations

As the domain evolves, we may add:

- Request/response correlation mechanisms
- Timing metrics (latency, download time)
- Size information (bytes sent/received)
- Cache behavior indicators
- WebSocket and other protocol support
