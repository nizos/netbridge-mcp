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
  })
})
