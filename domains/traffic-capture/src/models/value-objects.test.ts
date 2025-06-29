import { describe, it, expect } from 'vitest'

import { HttpMethod } from './value-objects'

describe('Value Objects', () => {
  describe('HttpMethod', () => {
    it.each([
      'GET',
      'POST',
      'PUT',
      'DELETE',
      'PATCH',
      'HEAD',
      'OPTIONS',
    ] as const)('exports %s method constant', (method) => {
      expect(HttpMethod[method]).toBe(method)
    })
  })
})
