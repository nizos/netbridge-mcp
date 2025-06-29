import type { ReadonlyDeep } from 'type-fest'
import { describe, it, expect } from 'vitest'

import { createTestNetworkRequest } from '../test-factories'

import { createNetworkRequest } from './network-request'
import type { NetworkRequest } from './network-request'

type TestCase = readonly [
  keyof NetworkRequest,
  Partial<ReadonlyDeep<NetworkRequest>>,
  unknown,
]

describe('NetworkRequest', () => {
  describe('createNetworkRequest', () => {
    const testCases: readonly TestCase[] = [
      ['id', { id: 'req-123' }, 'req-123'],
      ['timestamp', { timestamp: 1735464000000 }, 1735464000000],
      ['method', {}, 'GET'],
      [
        'url',
        { url: 'https://api.example.com/users' },
        'https://api.example.com/users',
      ],
      ['headers', {}, { 'Content-Type': 'application/json' }],
      [
        'body',
        { method: 'POST', body: { name: 'John Doe' } },
        { name: 'John Doe' },
      ],
    ]

    it.each(testCases)(
      'creates a network request with %s',
      (property, overrides, expected) => {
        const request = createTestNetworkRequest(overrides)
        expect(request[property]).toEqual(expected)
      }
    )

    describe('validation errors', () => {
      it.each([
        [
          'empty id',
          {
            id: '',
            timestamp: 1735464000000,
            method: 'GET',
            url: 'https://api.example.com/users',
            headers: {},
          },
          'Invalid id: must not be empty',
        ],
        [
          'negative timestamp',
          {
            id: 'req-123',
            timestamp: -1,
            method: 'GET',
            url: 'https://api.example.com/users',
            headers: {},
          },
          'Invalid timestamp: must be positive',
        ],
        [
          'invalid HTTP method',
          {
            id: 'req-123',
            timestamp: 1735464000000,
            method: 'INVALID',
            url: 'https://api.example.com/users',
            headers: {},
          },
          'Invalid enum value',
        ],
        [
          'empty url',
          {
            id: 'req-123',
            timestamp: 1735464000000,
            method: 'GET',
            url: '',
            headers: {},
          },
          'Invalid url: must not be empty',
        ],
      ])('throws when %s', (_, input, expectedError) => {
        expect(() => createNetworkRequest(input)).toThrow(expectedError)
      })
    })
  })
})
