import { describe, it, expect } from 'vitest'

import { HttpMethod } from './value-objects'

describe('Value Objects', () => {
  describe('HttpMethod', () => {
    it('should export HTTP method constants', () => {
      expect(HttpMethod.GET).toBe('GET')
    })

    it('should export POST method', () => {
      expect(HttpMethod.POST).toBe('POST')
    })

    it('should export all standard HTTP methods', () => {
      expect(HttpMethod.PUT).toBe('PUT')
      expect(HttpMethod.DELETE).toBe('DELETE')
      expect(HttpMethod.PATCH).toBe('PATCH')
      expect(HttpMethod.HEAD).toBe('HEAD')
      expect(HttpMethod.OPTIONS).toBe('OPTIONS')
    })
  })
})
