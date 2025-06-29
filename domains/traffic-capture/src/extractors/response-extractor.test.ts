import { describe, expect, it } from 'vitest'

import { extractNetworkResponse } from './response-extractor'

describe('extractNetworkResponse', () => {
  it('extracts basic response information', () => {
    const browserResponse = {
      status: 200,
      statusText: 'OK',
      responseHeaders: [
        { name: 'Content-Type', value: 'application/json' },
        { name: 'Cache-Control', value: 'no-cache' },
      ],
    }

    const result = extractNetworkResponse(browserResponse)

    expect(result).toMatchObject({
      status: 200,
      statusText: 'OK',
    })
  })
})
