import {
  createRequestCapturedEvent,
  createResponseCapturedEvent,
  createCaptureErrorEvent,
} from '../events/capture-events'
import type {
  RequestCapturedEvent,
  ResponseCapturedEvent,
  CaptureErrorEvent,
} from '../events/capture-events'
import { createNetworkRequest } from '../models/network-request'
import { createNetworkResponse } from '../models/network-response'

export type RawRequest = {
  id: string
  timestamp: number
  method: string
  url: string
  headers: Record<string, string>
  body?: unknown
}

export type RawResponse = {
  status: number
  statusText: string
  headers: Record<string, string>
  body?: unknown
}

type CaptureEvent =
  | RequestCapturedEvent
  | ResponseCapturedEvent
  | CaptureErrorEvent

export function captureRequest(rawRequest: RawRequest): CaptureEvent[] {
  const networkRequest = createNetworkRequest(rawRequest)
  const event = createRequestCapturedEvent({ request: networkRequest })
  return [event]
}

export function captureResponse(options: {
  requestId: string
  rawResponse: RawResponse
}): CaptureEvent[] {
  const networkResponse = createNetworkResponse(options.rawResponse)
  const event = createResponseCapturedEvent({
    requestId: options.requestId,
    response: networkResponse,
  })
  return [event]
}

export function captureError(options: {
  requestId: string
  error: string
}): CaptureEvent[] {
  const event = createCaptureErrorEvent(options)
  return [event]
}
