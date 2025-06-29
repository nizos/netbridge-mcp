import {
  createNetworkRequest,
  type NetworkRequest,
} from '../models/network-request'
import {
  createNetworkResponse,
  type NetworkResponse,
} from '../models/network-response'
import { HttpMethod } from '../models/value-objects'
import type { RawRequest, RawResponse } from '../services/capture-service'

import {
  TEST_REQUEST_ID,
  TEST_TIMESTAMP,
  TEST_API_URL,
  TEST_BASE_URL,
  TEST_HEADERS,
} from './test-constants'

export * from './test-constants'

export const createTestNetworkRequest = (
  overrides?: Partial<NetworkRequest>
): NetworkRequest => {
  const defaultRequest = {
    id: TEST_REQUEST_ID,
    timestamp: TEST_TIMESTAMP,
    method: HttpMethod.GET,
    url: TEST_API_URL,
    headers: TEST_HEADERS.JSON,
  }
  return createNetworkRequest({
    ...defaultRequest,
    ...overrides,
  })
}

export const createTestNetworkResponse = (
  overrides?: Partial<NetworkResponse>
): NetworkResponse =>
  createNetworkResponse({
    status: 200,
    statusText: 'OK',
    headers: TEST_HEADERS.JSON,
    body: { data: 'test' },
    ...overrides,
  })

// Browser-specific test factories for extractors
export const createTestBrowserRequest = (overrides?: {
  requestId?: string
  url?: string
  method?: string
  timeStamp?: number
  requestHeaders?: Array<{ name: string; value: string }>
}) => ({
  requestId: TEST_REQUEST_ID,
  url: TEST_API_URL,
  method: 'GET',
  timeStamp: TEST_TIMESTAMP,
  requestHeaders: [],
  ...overrides,
})

export const createTestBrowserResponse = (overrides?: {
  status?: number
  statusText?: string
  responseHeaders?: Array<{ name: string; value: string }>
}) => ({
  status: 200,
  statusText: 'OK',
  responseHeaders: [],
  ...overrides,
})

// Raw request/response factories for capture service
export const createTestRawRequest = (
  overrides?: Partial<RawRequest>
): RawRequest => ({
  id: TEST_REQUEST_ID,
  timestamp: TEST_TIMESTAMP,
  method: HttpMethod.GET,
  url: TEST_API_URL,
  headers: TEST_HEADERS.JSON,
  ...overrides,
})

export const createTestRawResponse = (
  overrides?: Partial<RawResponse>
): RawResponse => ({
  status: 200,
  statusText: 'OK',
  headers: TEST_HEADERS.JSON,
  body: { data: 'test' },
  ...overrides,
})

// Specialized factory variants
export const createMinimalTestRequest = (): NetworkRequest =>
  createTestNetworkRequest({
    id: 'minimal-1',
    url: TEST_BASE_URL,
    method: HttpMethod.GET,
    headers: TEST_HEADERS.EMPTY,
  })

export const createTestEmptyResponse = (): NetworkResponse =>
  createTestNetworkResponse({
    status: 204,
    statusText: 'No Content',
    headers: TEST_HEADERS.EMPTY,
    body: undefined,
  })
