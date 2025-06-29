import { describe, expect, it } from 'vitest'

import { HttpMethod } from '../models/value-objects'

import {
  captureRequest,
  captureResponse,
  captureError,
} from './capture-service'

describe('CaptureService', () => {
  it('captures network request', () => {
    const request = {
      id: 'req-123',
      timestamp: Date.now(),
      method: 'GET',
      url: 'https://api.example.com/data',
      headers: {},
    }

    const events = captureRequest(request)

    expect(events).toHaveLength(1)
    expect(events[0]?.type).toBe('request-captured')
  })

  it('creates request captured event with network request', () => {
    const request = {
      id: 'req-123',
      timestamp: Date.now(),
      method: HttpMethod.GET,
      url: 'https://api.example.com/data',
      headers: { 'Content-Type': 'application/json' },
    }

    const events = captureRequest(request)

    expect(events[0]).toMatchObject({
      type: 'request-captured',
      correlationId: 'req-123',
      payload: {
        request: expect.objectContaining({
          id: 'req-123',
          method: HttpMethod.GET,
          url: 'https://api.example.com/data',
        }),
      },
    })
  })

  it('captures network response', () => {
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
    expect(events[0]?.type).toBe('response-captured')
  })

  it('creates response captured event with network response', () => {
    const requestId = 'req-123'
    const response = {
      status: 200,
      statusText: 'OK',
      headers: { 'Content-Type': 'application/json' },
      body: { data: 'test' },
    }

    const events = captureResponse({ requestId, rawResponse: response })

    expect(events[0]).toMatchObject({
      type: 'response-captured',
      correlationId: 'req-123',
      payload: {
        requestId: 'req-123',
        response: expect.objectContaining({
          status: 200,
          statusText: 'OK',
        }),
      },
    })
  })

  it('handles capture error', () => {
    const requestId = 'req-123'
    const error = 'Network timeout'

    const events = captureError({ requestId, error })

    expect(events).toHaveLength(1)
    expect(events[0]?.type).toBe('capture-error')
  })
})
