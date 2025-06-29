import { describe, expect, it } from 'vitest'

import { createTestBrowserResponse } from '../test-factories'

import { extractNetworkResponse } from './response-extractor'

describe('Browser response extraction', () => {
  it('captures HTTP status code for response analysis', () => {
    const browserResponse = createTestBrowserResponse()

    const result = extractNetworkResponse(browserResponse)

    expect(result.status).toBe(200)
  })

  it('preserves status text for debugging', () => {
    const browserResponse = createTestBrowserResponse({
      status: 404,
      statusText: 'Not Found',
    })

    const result = extractNetworkResponse(browserResponse)

    expect(result.statusText).toBe('Not Found')
  })

  it('handles non-standard status codes', () => {
    const browserResponse = createTestBrowserResponse({
      status: 999,
      statusText: 'Custom Status',
    })

    const result = extractNetworkResponse(browserResponse)

    expect(result.status).toBe(999)
  })

  it('processes empty status text', () => {
    const browserResponse = createTestBrowserResponse({
      statusText: '',
    })

    const result = extractNetworkResponse(browserResponse)

    expect(result.statusText).toBe('')
  })
})
