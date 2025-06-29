import { describe, expect, it } from 'vitest'

import {
  createTestBrowserRequest,
  TEST_API_URL,
  TEST_TIMESTAMP,
  TEST_USER_AGENTS,
  TEST_AUTH_TOKENS,
} from '../test-factories'

import { extractNetworkRequest } from './request-extractor'

describe('Browser request extraction', () => {
  it('converts browser request ID to domain ID', () => {
    const browserRequest = createTestBrowserRequest({
      requestId: 'browser-req-123',
    })

    const result = extractNetworkRequest(browserRequest)

    expect(result.id).toBe('browser-req-123')
  })

  it('preserves request URL for traffic analysis', () => {
    const browserRequest = createTestBrowserRequest({
      url: `${TEST_API_URL}?query=test`,
    })

    const result = extractNetworkRequest(browserRequest)

    expect(result.url).toBe(`${TEST_API_URL}?query=test`)
  })

  it('captures HTTP method for request categorization', () => {
    const browserRequest = createTestBrowserRequest({
      method: 'POST',
    })

    const result = extractNetworkRequest(browserRequest)

    expect(result.method).toBe('POST')
  })

  it('converts browser timestamp to standard format', () => {
    const browserRequest = createTestBrowserRequest()

    const result = extractNetworkRequest(browserRequest)

    expect(result.timestamp).toBe(TEST_TIMESTAMP)
  })

  it('converts browser headers to standard format', () => {
    const browserRequest = createTestBrowserRequest({
      requestHeaders: [
        { name: 'Content-Type', value: 'application/json' },
        { name: 'User-Agent', value: TEST_USER_AGENTS.MOZILLA },
        { name: 'Authorization', value: TEST_AUTH_TOKENS.BEARER },
      ],
    })

    const result = extractNetworkRequest(browserRequest)

    expect(result.headers).toEqual({
      'Content-Type': 'application/json',
      'User-Agent': TEST_USER_AGENTS.MOZILLA,
      Authorization: TEST_AUTH_TOKENS.BEARER,
    })
  })

  it('handles empty header list', () => {
    const browserRequest = createTestBrowserRequest()

    const result = extractNetworkRequest(browserRequest)

    expect(result.headers).toEqual({})
  })

  it('preserves uppercase header names', () => {
    const browserRequest = createTestBrowserRequest({
      requestHeaders: [{ name: 'X-Custom-Header', value: 'custom-value' }],
    })

    const result = extractNetworkRequest(browserRequest)

    expect(result.headers['X-Custom-Header']).toBe('custom-value')
  })

  it('preserves lowercase header names', () => {
    const browserRequest = createTestBrowserRequest({
      requestHeaders: [{ name: 'x-another-header', value: 'another-value' }],
    })

    const result = extractNetworkRequest(browserRequest)

    expect(result.headers['x-another-header']).toBe('another-value')
  })

  it('handles duplicate header names by using last value', () => {
    const browserRequest = createTestBrowserRequest({
      requestHeaders: [
        { name: 'X-Test', value: 'first' },
        { name: 'X-Test', value: 'second' },
        { name: 'X-Test', value: 'last' },
      ],
    })

    const result = extractNetworkRequest(browserRequest)

    expect(result.headers['X-Test']).toBe('last')
  })
})
