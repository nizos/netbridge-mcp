import { describe, it, expect } from 'vitest'

import { createTestNetworkRequest } from '../test-factories'

import { createNetworkRequest } from './network-request'

describe('NetworkRequest', () => {
  describe('createNetworkRequest', () => {
    it('creates a network request with custom id', () => {
      const request = createTestNetworkRequest({ id: 'req-123' })
      expect(request.id).toBe('req-123')
    })

    it('creates a network request with custom timestamp', () => {
      const request = createTestNetworkRequest({ timestamp: 1735464000000 })
      expect(request.timestamp).toBe(1735464000000)
    })

    it('creates a network request with default method', () => {
      const request = createTestNetworkRequest()
      expect(request.method).toBe('GET')
    })

    it('creates a network request with custom url', () => {
      const request = createTestNetworkRequest({
        url: 'https://api.example.com/users',
      })
      expect(request.url).toBe('https://api.example.com/users')
    })

    it('creates a network request with default headers', () => {
      const request = createTestNetworkRequest()
      expect(request.headers).toEqual({ 'Content-Type': 'application/json' })
    })

    it('creates a network request with body', () => {
      const body = { name: 'John Doe' }
      const request = createTestNetworkRequest({ method: 'POST', body })
      expect(request.body).toEqual(body)
    })

    it('throws when id is empty', () => {
      expect(() =>
        createNetworkRequest({
          id: '',
          timestamp: 1735464000000,
          method: 'GET',
          url: 'https://api.example.com/users',
          headers: {},
        })
      ).toThrow('Invalid id: must not be empty')
    })

    it('throws when timestamp is negative', () => {
      expect(() =>
        createNetworkRequest({
          id: 'req-123',
          timestamp: -1,
          method: 'GET',
          url: 'https://api.example.com/users',
          headers: {},
        })
      ).toThrow('Invalid timestamp: must be positive')
    })

    it('throws when method is not a valid HTTP method', () => {
      expect(() =>
        createNetworkRequest({
          id: 'req-123',
          timestamp: 1735464000000,
          method: 'INVALID',
          url: 'https://api.example.com/users',
          headers: {},
        })
      ).toThrow('Invalid enum value')
    })

    it('throws when url is empty', () => {
      expect(() =>
        createNetworkRequest({
          id: 'req-123',
          timestamp: 1735464000000,
          method: 'GET',
          url: '',
          headers: {},
        })
      ).toThrow('Invalid url: must not be empty')
    })
  })
})
