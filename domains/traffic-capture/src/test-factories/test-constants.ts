export const TEST_REQUEST_ID = 'req-123'
export const TEST_TIMESTAMP = 1735464000000
export const TEST_API_URL = 'https://api.example.com/data'
export const TEST_BASE_URL = 'https://api.example.com'

export const TEST_HEADERS = {
  JSON: { 'Content-Type': 'application/json' },
  TEXT: { 'Content-Type': 'text/plain' },
  EMPTY: {} as Record<string, string>,
} as const

export const TEST_ERRORS = {
  NETWORK_TIMEOUT: 'Network timeout',
  CONNECTION_REFUSED: 'Connection refused',
  CONNECTION_RESET: 'Connection reset by peer',
  SSL_CERT_FAILED: 'SSL certificate verification failed',
} as const

export const TEST_USER_AGENTS = {
  MOZILLA: 'Mozilla/5.0',
  CHROME: 'Chrome/91.0.4472.124',
} as const

export const TEST_AUTH_TOKENS = {
  BEARER: 'Bearer token123',
} as const
