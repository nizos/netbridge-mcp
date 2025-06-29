import { describe, it, expect } from 'vitest'

import { createTestNetworkResponse } from '../test-factories'

import { createNetworkResponse } from './network-response'

describe('NetworkResponse', () => {
  describe('createNetworkResponse', () => {
    it('creates a network response with default status', () => {
      const response = createTestNetworkResponse()
      expect(response.status).toBe(200)
    })

    it('creates a network response with default statusText', () => {
      const response = createTestNetworkResponse()
      expect(response.statusText).toBe('OK')
    })

    it('creates a network response with custom headers', () => {
      const headers = {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      }
      const response = createTestNetworkResponse({ headers })
      expect(response.headers).toEqual(headers)
    })

    it('creates a network response with body', () => {
      const body = { message: 'Success', data: [1, 2, 3] }
      const response = createTestNetworkResponse({ body })
      expect(response.body).toEqual(body)
    })

    it('throws when status is not a valid HTTP status code', () => {
      expect(() =>
        createNetworkResponse({
          status: 999,
          statusText: 'Invalid',
          headers: {},
        })
      ).toThrow('Invalid status: must be between 100 and 599')
    })
  })
})
