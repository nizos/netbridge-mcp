import type { ReadonlyDeep } from 'type-fest'
import { describe, it, expect } from 'vitest'

import { createTestNetworkResponse } from '../test-factories'

import { createNetworkResponse } from './network-response'
import type { NetworkResponse } from './network-response'

type TestCase = readonly [
  keyof NetworkResponse,
  Partial<ReadonlyDeep<NetworkResponse>>,
  unknown,
]

describe('NetworkResponse', () => {
  describe('createNetworkResponse', () => {
    const testCases: readonly TestCase[] = [
      ['status', {}, 200],
      ['statusText', {}, 'OK'],
      [
        'headers',
        {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
          },
        },
        {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
      ],
      [
        'body',
        { body: { message: 'Success', data: [1, 2, 3] } },
        { message: 'Success', data: [1, 2, 3] },
      ],
    ]

    it.each(testCases)(
      'creates a network response with %s',
      (property, overrides, expected) => {
        const response = createTestNetworkResponse(overrides)
        expect(response[property]).toEqual(expected)
      }
    )

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
