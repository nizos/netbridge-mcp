import { describe, it, expect } from 'vitest'

import { createNetworkResponse } from './network-response'

describe('NetworkResponse', () => {
  describe('createNetworkResponse', () => {
    it('should create a network response with a status', () => {
      const response = createNetworkResponse({
        status: 200,
        statusText: 'OK',
        headers: {},
      })

      expect(response.status).toBe(200)
    })

    it('should create a network response with a statusText', () => {
      const response = createNetworkResponse({
        status: 200,
        statusText: 'OK',
        headers: {},
      })

      expect(response.statusText).toBe('OK')
    })

    it('should create a network response with headers', () => {
      const response = createNetworkResponse({
        status: 200,
        statusText: 'OK',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
      })

      expect(response.headers).toEqual({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      })
    })

    it('should throw when status is not a valid HTTP status code', () => {
      expect(() =>
        createNetworkResponse({
          status: 999,
          statusText: 'Invalid',
          headers: {},
        })
      ).toThrow('Invalid HTTP status code')
    })

    it('should create a network response with optional body', () => {
      const response = createNetworkResponse({
        status: 200,
        statusText: 'OK',
        headers: {},
        body: { message: 'Success', data: [1, 2, 3] },
      })

      expect(response.body).toEqual({ message: 'Success', data: [1, 2, 3] })
    })
  })
})
