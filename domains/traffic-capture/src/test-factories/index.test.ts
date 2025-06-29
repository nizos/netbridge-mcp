import { describe, it, expect } from 'vitest'

import {
  createTestNetworkRequest,
  createTestNetworkResponse,
  TEST_REQUEST_ID,
} from './index'

describe('Test Factories', () => {
  describe('createTestNetworkRequest', () => {
    it('creates a network request with default values', () => {
      const request = createTestNetworkRequest()

      expect(request.id).toBe(TEST_REQUEST_ID)
    })

    it('allows overriding default values', () => {
      const request = createTestNetworkRequest({
        method: 'POST',
        url: 'https://custom.example.com/api',
      })

      expect(request.method).toBe('POST')
      expect(request.url).toBe('https://custom.example.com/api')
    })
  })

  describe('createTestNetworkResponse', () => {
    it('creates a network response with default values', () => {
      const response = createTestNetworkResponse()

      expect(response.status).toBe(200)
    })
  })
})
