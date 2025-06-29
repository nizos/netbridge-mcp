import { describe, expect, it } from 'vitest'

import { extractNetworkRequest } from './request-extractor'

describe('extractNetworkRequest', () => {
  it('extracts basic request information', () => {
    const browserRequest = {
      requestId: 'browser-req-123',
      url: 'https://api.example.com/data',
      method: 'GET',
      timeStamp: 1735464000000,
      requestHeaders: [
        { name: 'Content-Type', value: 'application/json' },
        { name: 'User-Agent', value: 'Mozilla/5.0' },
      ],
    }

    const result = extractNetworkRequest(browserRequest)

    expect(result).toMatchObject({
      id: 'browser-req-123',
      url: 'https://api.example.com/data',
      method: 'GET',
      timestamp: 1735464000000,
    })
  })

  it('transforms headers from array to object', () => {
    const browserRequest = {
      requestId: 'browser-req-123',
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
})
