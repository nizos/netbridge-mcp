import { describe, expect, it } from 'vitest'

import {
  createTestNetworkRequest,
  createTestNetworkResponse,
} from '../test-factories'

import {
  createRequestCapturedEvent,
  RequestCapturedEventSchema,
  createResponseCapturedEvent,
  ResponseCapturedEventSchema,
  createCaptureErrorEvent,
} from './capture-events'

describe('Request capture', () => {
  it('captures browser request for monitoring', () => {
    const request = createTestNetworkRequest()
    const event = createRequestCapturedEvent({ request })

    expect(event.type).toBe('request-captured')
  })

  it('records capture time for request timeline', () => {
    const request = createTestNetworkRequest()
    const event = createRequestCapturedEvent({ request })

    expect(event.timestamp).toBeGreaterThan(0)
  })

  it('preserves original request data in event', () => {
    const request = createTestNetworkRequest()
    const event = createRequestCapturedEvent({ request })

    expect(event.payload.request).toEqual(request)
  })

  it('tracks request lifecycle with correlation id', () => {
    const request = createTestNetworkRequest({ id: 'req-123' })
    const event = createRequestCapturedEvent({ request })

    expect(event.correlationId).toBe('req-123')
  })

  it('produces valid domain event for downstream processing', () => {
    const request = createTestNetworkRequest()
    const event = createRequestCapturedEvent({ request })

    const result = RequestCapturedEventSchema.safeParse(event)
    expect(result.success).toBe(true)
  })
})

describe('Response capture', () => {
  it('captures server response for analysis', () => {
    const requestId = 'req-123'
    const response = createTestNetworkResponse()
    const event = createResponseCapturedEvent({ requestId, response })

    expect(event.type).toBe('response-captured')
  })

  it('records response arrival time', () => {
    const requestId = 'req-123'
    const response = createTestNetworkResponse()
    const event = createResponseCapturedEvent({ requestId, response })

    expect(event.timestamp).toBeGreaterThan(0)
  })

  it('links response to originating request', () => {
    const requestId = 'req-123'
    const response = createTestNetworkResponse()
    const event = createResponseCapturedEvent({ requestId, response })

    expect(event.payload.requestId).toBe(requestId)
  })

  it('preserves server response data', () => {
    const requestId = 'req-123'
    const response = createTestNetworkResponse()
    const event = createResponseCapturedEvent({ requestId, response })

    expect(event.payload.response).toEqual(response)
  })

  it('maintains request-response correlation', () => {
    const requestId = 'req-123'
    const response = createTestNetworkResponse()
    const event = createResponseCapturedEvent({ requestId, response })

    expect(event.correlationId).toBe(requestId)
  })

  it('produces valid domain event for downstream processing', () => {
    const requestId = 'req-123'
    const response = createTestNetworkResponse()
    const event = createResponseCapturedEvent({ requestId, response })

    const result = ResponseCapturedEventSchema.safeParse(event)
    expect(result.success).toBe(true)
  })
})

describe('Capture error handling', () => {
  it('reports network capture failures', () => {
    const requestId = 'req-123'
    const error = 'Network timeout'
    const event = createCaptureErrorEvent({ requestId, error })

    expect(event.type).toBe('capture-error')
  })

  it('records error occurrence time', () => {
    const requestId = 'req-123'
    const error = 'Network timeout'
    const event = createCaptureErrorEvent({ requestId, error })

    expect(event.timestamp).toBeGreaterThan(0)
  })

  it('associates error with failed request', () => {
    const requestId = 'req-123'
    const error = 'Network timeout'
    const event = createCaptureErrorEvent({ requestId, error })

    expect(event.correlationId).toBe(requestId)
  })

  it('preserves error details for debugging', () => {
    const requestId = 'req-123'
    const error = 'Connection reset by peer'
    const event = createCaptureErrorEvent({ requestId, error })

    expect(event.payload.error).toBe('Connection reset by peer')
  })
})

describe('Edge cases', () => {
  it('handles requests with minimal data', () => {
    const minimalRequest = createTestNetworkRequest({
      id: 'minimal-1',
      url: 'https://example.com',
      method: 'GET',
      headers: {},
    })

    const event = createRequestCapturedEvent({ request: minimalRequest })
    const result = RequestCapturedEventSchema.safeParse(event)

    expect(result.success).toBe(true)
  })

  it('processes responses with empty body', () => {
    const response = createTestNetworkResponse({
      status: 204,
      statusText: 'No Content',
      headers: {},
      body: undefined,
    })

    const event = createResponseCapturedEvent({
      requestId: 'req-204',
      response,
    })

    expect(event.payload.response.body).toBeUndefined()
  })

  it('handles very long error messages', () => {
    const longError = `Error: ${'x'.repeat(1000)}`
    const event = createCaptureErrorEvent({
      requestId: 'req-error',
      error: longError,
    })

    expect(event.payload.error).toBe(longError)
  })
})
