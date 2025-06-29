import { z } from 'zod'

import { NetworkRequestSchema } from '../models/network-request'
import type { NetworkRequest } from '../models/network-request'
import { NetworkResponseSchema } from '../models/network-response'
import type { NetworkResponse } from '../models/network-response'

export const RequestCapturedEventSchema = z.object({
  type: z.literal('request-captured'),
  timestamp: z.number(),
  correlationId: z.string(),
  payload: z.object({
    request: NetworkRequestSchema,
  }),
})

export type RequestCapturedEvent = z.infer<typeof RequestCapturedEventSchema>

export const ResponseCapturedEventSchema = z.object({
  type: z.literal('response-captured'),
  timestamp: z.number(),
  correlationId: z.string(),
  payload: z.object({
    requestId: z.string(),
    response: NetworkResponseSchema,
  }),
})

export type ResponseCapturedEvent = z.infer<typeof ResponseCapturedEventSchema>

export const CaptureErrorEventSchema = z.object({
  type: z.literal('capture-error'),
  timestamp: z.number(),
  correlationId: z.string(),
  payload: z.object({
    requestId: z.string(),
    error: z.string(),
  }),
})

export type CaptureErrorEvent = z.infer<typeof CaptureErrorEventSchema>

export const createRequestCapturedEvent = (options: {
  request: NetworkRequest
}): RequestCapturedEvent => ({
  type: 'request-captured',
  timestamp: Date.now(),
  correlationId: options.request.id,
  payload: {
    request: options.request,
  },
})

export const createResponseCapturedEvent = (options: {
  requestId: string
  response: NetworkResponse
}): ResponseCapturedEvent => ({
  type: 'response-captured',
  timestamp: Date.now(),
  correlationId: options.requestId,
  payload: {
    requestId: options.requestId,
    response: options.response,
  },
})

export const createCaptureErrorEvent = (options: {
  requestId: string
  error: string
}): CaptureErrorEvent => ({
  type: 'capture-error',
  timestamp: Date.now(),
  correlationId: options.requestId,
  payload: {
    requestId: options.requestId,
    error: options.error,
  },
})
