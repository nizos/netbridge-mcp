import { beforeEach, describe, expect, it } from 'vitest'

import {
  createTestNetworkRequest,
  createTestNetworkResponse,
  createMinimalTestRequest,
  createTestEmptyResponse,
  TEST_REQUEST_ID,
  TEST_ERRORS,
} from '../test-factories'

import {
  createRequestCapturedEvent,
  RequestCapturedEventSchema,
  createResponseCapturedEvent,
  ResponseCapturedEventSchema,
  createCaptureErrorEvent,
} from './capture-events'

const requestId = TEST_REQUEST_ID

describe('Request capture', () => {
  let request: ReturnType<typeof createTestNetworkRequest>
  let event: ReturnType<typeof createRequestCapturedEvent>

  beforeEach(() => {
    request = createTestNetworkRequest()
    event = createRequestCapturedEvent({ request })
  })

  it('captures browser request for monitoring', () => {
    expect(event.type).toBe('request-captured')
  })

  it('records capture time for request timeline', () => {
    expect(event.timestamp).toBeGreaterThan(0)
  })

  it('preserves original request data in event', () => {
    expect(event.payload.request).toEqual(request)
  })

  it('tracks request lifecycle with correlation id', () => {
    expect(event.correlationId).toBe(requestId)
  })

  it('produces valid domain event for downstream processing', () => {
    const result = RequestCapturedEventSchema.safeParse(event)
    expect(result.success).toBe(true)
  })
})

describe('Response capture', () => {
  let response: ReturnType<typeof createTestNetworkResponse>
  let event: ReturnType<typeof createResponseCapturedEvent>

  beforeEach(() => {
    response = createTestNetworkResponse()
    event = createResponseCapturedEvent({ requestId, response })
  })

  it('captures server response for analysis', () => {
    expect(event.type).toBe('response-captured')
  })

  it('records response arrival time', () => {
    expect(event.timestamp).toBeGreaterThan(0)
  })

  it('links response to originating request', () => {
    expect(event.payload.requestId).toBe(requestId)
  })

  it('preserves server response data', () => {
    expect(event.payload.response).toEqual(response)
  })

  it('maintains request-response correlation', () => {
    expect(event.correlationId).toBe(requestId)
  })

  it('produces valid domain event for downstream processing', () => {
    const result = ResponseCapturedEventSchema.safeParse(event)
    expect(result.success).toBe(true)
  })
})

describe('Capture error handling', () => {
  it('reports network capture failures', () => {
    const event = createCaptureErrorEvent({
      requestId,
      error: TEST_ERRORS.NETWORK_TIMEOUT,
    })

    expect(event.type).toBe('capture-error')
  })

  it('records error occurrence time', () => {
    const event = createCaptureErrorEvent({
      requestId,
      error: TEST_ERRORS.NETWORK_TIMEOUT,
    })

    expect(event.timestamp).toBeGreaterThan(0)
  })

  it('associates error with failed request', () => {
    const event = createCaptureErrorEvent({
      requestId,
      error: TEST_ERRORS.CONNECTION_REFUSED,
    })

    expect(event.correlationId).toBe(requestId)
  })

  it('preserves error details for debugging', () => {
    const event = createCaptureErrorEvent({
      requestId,
      error: TEST_ERRORS.CONNECTION_RESET,
    })

    expect(event.payload.error).toBe(TEST_ERRORS.CONNECTION_RESET)
  })
})

describe('Edge cases', () => {
  it('handles requests with minimal data', () => {
    const minimalRequest = createMinimalTestRequest()
    const event = createRequestCapturedEvent({ request: minimalRequest })
    const result = RequestCapturedEventSchema.safeParse(event)

    expect(result.success).toBe(true)
  })

  it('processes responses with empty body', () => {
    const response = createTestEmptyResponse()
    const event = createResponseCapturedEvent({ requestId, response })

    expect(event.payload.response.body).toBeUndefined()
  })

  it('handles very long error messages', () => {
    const longError = `Error: ${'x'.repeat(1000)}`
    const event = createCaptureErrorEvent({ requestId, error: longError })

    expect(event.payload.error).toBe(longError)
  })
})
