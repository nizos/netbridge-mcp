import { beforeEach, describe, expect, it } from 'vitest'

import {
  createTestRawRequest,
  createTestRawResponse,
  TEST_REQUEST_ID,
  TEST_ERRORS,
  TEST_HEADERS,
} from '../test-factories'

import {
  captureRequest,
  captureResponse,
  captureError,
} from './capture-service'

const requestId = TEST_REQUEST_ID

describe('Network traffic capture', () => {
  describe('Request capture', () => {
    let request: ReturnType<typeof createTestRawRequest>
    let events: ReturnType<typeof captureRequest>

    beforeEach(() => {
      request = createTestRawRequest()
      events = captureRequest(request)
    })

    it('produces single event per request', () => {
      expect(events).toHaveLength(1)
    })

    it('marks event as request capture type', () => {
      expect(events[0]?.type).toBe('request-captured')
    })

    it('correlates event with request ID', () => {
      expect(events[0]?.correlationId).toBe(requestId)
    })

    it('validates and transforms raw request data', () => {
      const event = events[0]

      expect(event?.type).toBe('request-captured')
      if (event?.type === 'request-captured') {
        expect(event.payload.request.id).toBe(requestId)
      }
    })
  })

  describe('Response capture', () => {
    let response: ReturnType<typeof createTestRawResponse>
    let events: ReturnType<typeof captureResponse>

    beforeEach(() => {
      response = createTestRawResponse()
      events = captureResponse({ requestId, rawResponse: response })
    })

    it('produces single event per response', () => {
      expect(events).toHaveLength(1)
    })

    it('marks event as response capture type', () => {
      expect(events[0]?.type).toBe('response-captured')
    })

    it('links response to original request', () => {
      expect(events[0]?.correlationId).toBe(requestId)
    })

    it('validates and transforms raw response data', () => {
      const customResponse = createTestRawResponse({
        status: 404,
        statusText: 'Not Found',
        headers: TEST_HEADERS.TEXT,
        body: 'Resource not found',
      })

      const customEvents = captureResponse({
        requestId,
        rawResponse: customResponse,
      })
      const event = customEvents[0]

      expect(event?.type).toBe('response-captured')
      if (event?.type === 'response-captured') {
        expect(event.payload.response.status).toBe(404)
        expect(event.payload.response.statusText).toBe('Not Found')
      }
    })
  })

  describe('Error capture', () => {
    it('produces single event per error', () => {
      const events = captureError({
        requestId,
        error: TEST_ERRORS.NETWORK_TIMEOUT,
      })

      expect(events).toHaveLength(1)
    })

    it('marks event as capture error type', () => {
      const events = captureError({
        requestId,
        error: TEST_ERRORS.NETWORK_TIMEOUT,
      })

      expect(events[0]?.type).toBe('capture-error')
    })

    it('associates error with request', () => {
      const events = captureError({
        requestId,
        error: TEST_ERRORS.CONNECTION_REFUSED,
      })

      expect(events[0]?.correlationId).toBe(requestId)
    })

    it('preserves error message for troubleshooting', () => {
      const events = captureError({
        requestId,
        error: TEST_ERRORS.SSL_CERT_FAILED,
      })
      const event = events[0]

      expect(event?.type).toBe('capture-error')
      if (event?.type === 'capture-error') {
        expect(event.payload.error).toBe(TEST_ERRORS.SSL_CERT_FAILED)
      }
    })
  })
})
