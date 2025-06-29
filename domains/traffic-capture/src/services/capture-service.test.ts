import { describe, expect, it } from 'vitest'

import { HttpMethod } from '../models/value-objects'

import {
  captureRequest,
  captureResponse,
  captureError,
} from './capture-service'

describe('Network traffic capture', () => {
  describe('Request capture', () => {
    it('produces single event per request', () => {
      const request = {
        id: 'req-123',
        timestamp: Date.now(),
        method: 'GET',
        url: 'https://api.example.com/data',
        headers: {},
      }

      const events = captureRequest(request)

      expect(events).toHaveLength(1)
    })

    it('marks event as request capture type', () => {
      const request = {
        id: 'req-123',
        timestamp: Date.now(),
        method: 'GET',
        url: 'https://api.example.com/data',
        headers: {},
      }

      const events = captureRequest(request)

      expect(events[0]?.type).toBe('request-captured')
    })

    it('correlates event with request ID', () => {
      const request = {
        id: 'req-123',
        timestamp: Date.now(),
        method: HttpMethod.GET,
        url: 'https://api.example.com/data',
        headers: { 'Content-Type': 'application/json' },
      }

      const events = captureRequest(request)

      expect(events[0]?.correlationId).toBe('req-123')
    })

    it('validates and transforms raw request data', () => {
      const request = {
        id: 'req-123',
        timestamp: Date.now(),
        method: HttpMethod.GET,
        url: 'https://api.example.com/data',
        headers: { 'Content-Type': 'application/json' },
      }

      const events = captureRequest(request)
      const event = events[0]

      expect(event?.type).toBe('request-captured')
      if (event?.type === 'request-captured') {
        expect(event.payload.request.id).toBe('req-123')
      }
    })
  })

  describe('Response capture', () => {
    it('produces single event per response', () => {
      const response = {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' },
        body: { data: 'test' },
      }

      const events = captureResponse({
        requestId: 'req-123',
        rawResponse: response,
      })

      expect(events).toHaveLength(1)
    })

    it('marks event as response capture type', () => {
      const response = {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' },
        body: { data: 'test' },
      }

      const events = captureResponse({
        requestId: 'req-123',
        rawResponse: response,
      })

      expect(events[0]?.type).toBe('response-captured')
    })

    it('links response to original request', () => {
      const requestId = 'req-123'
      const response = {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' },
        body: { data: 'test' },
      }

      const events = captureResponse({ requestId, rawResponse: response })

      expect(events[0]?.correlationId).toBe('req-123')
    })

    it('validates and transforms raw response data', () => {
      const requestId = 'req-123'
      const response = {
        status: 404,
        statusText: 'Not Found',
        headers: { 'Content-Type': 'text/plain' },
        body: 'Resource not found',
      }

      const events = captureResponse({ requestId, rawResponse: response })
      const event = events[0]

      expect(event?.type).toBe('response-captured')
      if (event?.type === 'response-captured') {
        expect(event.payload.response.status).toBe(404)
        expect(event.payload.response.statusText).toBe('Not Found')
      }
    })
  })

  describe('Error capture', () => {
    it('produces single event per error', () => {
      const requestId = 'req-123'
      const error = 'Network timeout'

      const events = captureError({ requestId, error })

      expect(events).toHaveLength(1)
    })

    it('marks event as capture error type', () => {
      const requestId = 'req-123'
      const error = 'Network timeout'

      const events = captureError({ requestId, error })

      expect(events[0]?.type).toBe('capture-error')
    })

    it('associates error with request', () => {
      const requestId = 'req-123'
      const error = 'Connection refused'

      const events = captureError({ requestId, error })

      expect(events[0]?.correlationId).toBe('req-123')
    })

    it('preserves error message for troubleshooting', () => {
      const requestId = 'req-123'
      const error = 'SSL certificate verification failed'

      const events = captureError({ requestId, error })
      const event = events[0]

      expect(event?.type).toBe('capture-error')
      if (event?.type === 'capture-error') {
        expect(event.payload.error).toBe('SSL certificate verification failed')
      }
    })
  })
})
