import type { ReadonlyDeep } from 'type-fest'

import {
  createNetworkRequest,
  type NetworkRequest,
} from '../models/network-request'
import {
  createNetworkResponse,
  type NetworkResponse,
} from '../models/network-response'
import { HttpMethod } from '../models/value-objects'

export const createTestNetworkRequest = (
  overrides?: Partial<ReadonlyDeep<NetworkRequest>>
): ReadonlyDeep<NetworkRequest> => {
  const defaultRequest = {
    id: `req-test-${Math.random().toString(36).substring(7)}`,
    timestamp: 1735464000000,
    method: HttpMethod.GET,
    url: 'https://api.example.com/test',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  return createNetworkRequest({
    ...defaultRequest,
    ...overrides,
  })
}

export const createTestNetworkResponse = (
  overrides?: Partial<ReadonlyDeep<NetworkResponse>>
): ReadonlyDeep<NetworkResponse> =>
  createNetworkResponse({
    status: 200,
    statusText: 'OK',
    headers: {
      'Content-Type': 'application/json',
    },
    ...overrides,
  })
