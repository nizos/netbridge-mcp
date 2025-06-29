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

describe('RequestCapturedEvent', () => {
  it('creates event when request is captured', () => {
    const request = createTestNetworkRequest()
    const event = createRequestCapturedEvent({ request })

    expect(event.type).toBe('request-captured')
  })

  it('includes timestamp when event is created', () => {
    const request = createTestNetworkRequest()
    const event = createRequestCapturedEvent({ request })

    expect(event.timestamp).toBeGreaterThan(0)
  })

  it('includes request in payload', () => {
    const request = createTestNetworkRequest()
    const event = createRequestCapturedEvent({ request })

    expect(event.payload.request).toEqual(request)
  })

  it('uses request id as correlation id', () => {
    const request = createTestNetworkRequest({ id: 'req-123' })
    const event = createRequestCapturedEvent({ request })

    expect(event.correlationId).toBe('req-123')
  })

  it('validates event structure with schema', () => {
    const request = createTestNetworkRequest()
    const event = createRequestCapturedEvent({ request })

    const result = RequestCapturedEventSchema.safeParse(event)
    expect(result.success).toBe(true)
  })
})

describe('ResponseCapturedEvent', () => {
  it('creates event when response is captured', () => {
    const requestId = 'req-123'
    const response = createTestNetworkResponse()
    const event = createResponseCapturedEvent({ requestId, response })

    expect(event.type).toBe('response-captured')
  })

  it('includes timestamp when event is created', () => {
    const requestId = 'req-123'
    const response = createTestNetworkResponse()
    const event = createResponseCapturedEvent({ requestId, response })

    expect(event.timestamp).toBeGreaterThan(0)
  })

  it('includes response and request id in payload', () => {
    const requestId = 'req-123'
    const response = createTestNetworkResponse()
    const event = createResponseCapturedEvent({ requestId, response })

    expect(event.payload.requestId).toBe(requestId)
    expect(event.payload.response).toEqual(response)
  })

  it('uses request id as correlation id', () => {
    const requestId = 'req-123'
    const response = createTestNetworkResponse()
    const event = createResponseCapturedEvent({ requestId, response })

    expect(event.correlationId).toBe(requestId)
  })

  it('validates event structure with schema', () => {
    const requestId = 'req-123'
    const response = createTestNetworkResponse()
    const event = createResponseCapturedEvent({ requestId, response })

    const result = ResponseCapturedEventSchema.safeParse(event)
    expect(result.success).toBe(true)
  })
})

describe('CaptureErrorEvent', () => {
  it('creates event when capture fails', () => {
    const requestId = 'req-123'
    const error = 'Network timeout'
    const event = createCaptureErrorEvent({ requestId, error })

    expect(event.type).toBe('capture-error')
  })

  it('includes timestamp when event is created', () => {
    const requestId = 'req-123'
    const error = 'Network timeout'
    const event = createCaptureErrorEvent({ requestId, error })

    expect(event.timestamp).toBeGreaterThan(0)
  })
})
