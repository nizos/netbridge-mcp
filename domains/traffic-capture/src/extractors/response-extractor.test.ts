import { describe, expect, it } from 'vitest'

import { extractNetworkResponse } from './response-extractor'

describe('Browser response extraction', () => {
  it('captures HTTP status code for response analysis', () => {
    const browserResponse = {
      status: 200,
      statusText: 'OK',
      responseHeaders: [],
    }

    const result = extractNetworkResponse(browserResponse)

    expect(result.status).toBe(200)
  })

  it('preserves status text for debugging', () => {
    const browserResponse = {
      status: 404,
      statusText: 'Not Found',
      responseHeaders: [],
    }

    const result = extractNetworkResponse(browserResponse)

    expect(result.statusText).toBe('Not Found')
  })

  it('handles non-standard status codes', () => {
    const browserResponse = {
      status: 999,
      statusText: 'Custom Status',
      responseHeaders: [],
    }

    const result = extractNetworkResponse(browserResponse)

    expect(result.status).toBe(999)
  })

  it('processes empty status text', () => {
    const browserResponse = {
      status: 200,
      statusText: '',
      responseHeaders: [],
    }

    const result = extractNetworkResponse(browserResponse)

    expect(result.statusText).toBe('')
  })
})
