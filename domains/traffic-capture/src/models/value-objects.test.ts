import { describe, it, expect } from 'vitest'

import { HttpMethod } from './value-objects'

describe('Value Objects', () => {
  describe('HttpMethod', () => {
    it.each([
      ['GET', 'GET'],
      ['POST', 'POST'],
      ['PUT', 'PUT'],
      ['DELETE', 'DELETE'],
      ['PATCH', 'PATCH'],
      ['HEAD', 'HEAD'],
      ['OPTIONS', 'OPTIONS'],
    ] as const)('exports %s method constant', (method, expected) => {
      expect(HttpMethod[method]).toBe(expected)
    })
  })
})
