import { describe, expect, it } from 'vitest'

import { extractNetworkRequest } from './request-extractor'

describe('Browser request extraction', () => {
  it('converts browser request ID to domain ID', () => {
    const browserRequest = {
      requestId: 'browser-req-123',
      url: 'https://api.example.com/data',
      method: 'GET',
      timeStamp: 1735464000000,
      requestHeaders: [],
    }

    const result = extractNetworkRequest(browserRequest)

    expect(result.id).toBe('browser-req-123')
  })

  it('preserves request URL for traffic analysis', () => {
    const browserRequest = {
      requestId: 'req-1',
      url: 'https://api.example.com/data?query=test',
      method: 'GET',
      timeStamp: 1735464000000,
      requestHeaders: [],
    }

    const result = extractNetworkRequest(browserRequest)

    expect(result.url).toBe('https://api.example.com/data?query=test')
  })

  it('captures HTTP method for request categorization', () => {
    const browserRequest = {
      requestId: 'req-1',
      url: 'https://api.example.com/data',
      method: 'POST',
      timeStamp: 1735464000000,
      requestHeaders: [],
    }

    const result = extractNetworkRequest(browserRequest)

    expect(result.method).toBe('POST')
  })

  it('converts browser timestamp to standard format', () => {
    const browserRequest = {
      requestId: 'req-1',
      url: 'https://api.example.com/data',
      method: 'GET',
      timeStamp: 1735464000000,
      requestHeaders: [],
    }

    const result = extractNetworkRequest(browserRequest)

    expect(result.timestamp).toBe(1735464000000)
  })

  it('converts browser headers to standard format', () => {
    const browserRequest = {
      requestId: 'req-1',
      url: 'https://api.example.com/data',
      method: 'GET',
      timeStamp: 1735464000000,
      requestHeaders: [
        { name: 'Content-Type', value: 'application/json' },
        { name: 'User-Agent', value: 'Mozilla/5.0' },
        { name: 'Authorization', value: 'Bearer token123' },
      ],
    }

    const result = extractNetworkRequest(browserRequest)

    expect(result.headers).toEqual({
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0',
      Authorization: 'Bearer token123',
    })
  })

  it('handles empty header list', () => {
    const browserRequest = {
      requestId: 'req-1',
      url: 'https://api.example.com/data',
      method: 'GET',
      timeStamp: 1735464000000,
      requestHeaders: [],
    }

    const result = extractNetworkRequest(browserRequest)

    expect(result.headers).toEqual({})
  })

  it('preserves header case sensitivity', () => {
    const browserRequest = {
      requestId: 'req-1',
      url: 'https://api.example.com/data',
      method: 'GET',
      timeStamp: 1735464000000,
      requestHeaders: [
        { name: 'X-Custom-Header', value: 'custom-value' },
        { name: 'x-another-header', value: 'another-value' },
      ],
    }

    const result = extractNetworkRequest(browserRequest)

    expect(result.headers['X-Custom-Header']).toBe('custom-value')
    expect(result.headers['x-another-header']).toBe('another-value')
  })

  it('handles duplicate header names by using last value', () => {
    const browserRequest = {
      requestId: 'req-1',
      url: 'https://api.example.com/data',
      method: 'GET',
      timeStamp: 1735464000000,
      requestHeaders: [
        { name: 'X-Test', value: 'first' },
        { name: 'X-Test', value: 'second' },
        { name: 'X-Test', value: 'last' },
      ],
    }

    const result = extractNetworkRequest(browserRequest)

    expect(result.headers['X-Test']).toBe('last')
  })
})
