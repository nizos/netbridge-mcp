import { describe, it, expect } from 'vitest'

import { createNetworkRequest } from './network-request'

describe('NetworkRequest', () => {
  describe('createNetworkRequest', () => {
    it('should create a network request with an id', () => {
      const request = createNetworkRequest({
        id: 'req-123',
        timestamp: 1735464000000,
        method: 'GET',
        url: 'https://api.example.com/users',
        headers: {},
      })

      expect(request.id).toBe('req-123')
    })

    it('should create a network request with a timestamp', () => {
      const request = createNetworkRequest({
        id: 'req-123',
        timestamp: 1735464000000,
        method: 'GET',
        url: 'https://api.example.com/users',
        headers: {},
      })

      expect(request.timestamp).toBe(1735464000000)
    })

    it('should create a network request with a method', () => {
      const request = createNetworkRequest({
        id: 'req-123',
        timestamp: 1735464000000,
        method: 'GET',
        url: 'https://api.example.com/users',
        headers: {},
      })

      expect(request.method).toBe('GET')
    })

    it('should create a network request with a url', () => {
      const request = createNetworkRequest({
        id: 'req-123',
        timestamp: 1735464000000,
        method: 'GET',
        url: 'https://api.example.com/users',
        headers: {},
      })

      expect(request.url).toBe('https://api.example.com/users')
    })

    it('should create a network request with headers', () => {
      const request = createNetworkRequest({
        id: 'req-123',
        timestamp: 1735464000000,
        method: 'GET',
        url: 'https://api.example.com/users',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      expect(request.headers).toEqual({
        'Content-Type': 'application/json',
      })
    })

    it('should throw when id is empty', () => {
      expect(() =>
        createNetworkRequest({
          id: '',
          timestamp: 1735464000000,
          method: 'GET',
          url: 'https://api.example.com/users',
          headers: {},
        })
      ).toThrow('ID cannot be empty')
    })

    it('should throw when timestamp is negative', () => {
      expect(() =>
        createNetworkRequest({
          id: 'req-123',
          timestamp: -1,
          method: 'GET',
          url: 'https://api.example.com/users',
          headers: {},
        })
      ).toThrow('Timestamp must be positive')
    })

    it('should throw when method is not a valid HTTP method', () => {
      expect(() =>
        createNetworkRequest({
          id: 'req-123',
          timestamp: 1735464000000,
          method: 'INVALID',
          url: 'https://api.example.com/users',
          headers: {},
        })
      ).toThrow()
    })

    it('should throw when url is empty', () => {
      expect(() =>
        createNetworkRequest({
          id: 'req-123',
          timestamp: 1735464000000,
          method: 'GET',
          url: '',
          headers: {},
        })
      ).toThrow('URL cannot be empty')
    })

    it('should create a network request with optional body', () => {
      const request = createNetworkRequest({
        id: 'req-123',
        timestamp: 1735464000000,
        method: 'POST',
        url: 'https://api.example.com/users',
        headers: {},
        body: { name: 'John Doe' },
      })

      expect(request.body).toEqual({ name: 'John Doe' })
    })
  })
})
