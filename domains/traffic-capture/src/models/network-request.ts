import type { ReadonlyDeep } from 'type-fest'
import { z } from 'zod'

import { HttpMethodSchema } from './value-objects'

export const NetworkRequestSchema = z.object({
  id: z.string().min(1, 'Invalid id: must not be empty'),
  timestamp: z.number().positive('Invalid timestamp: must be positive'),
  method: HttpMethodSchema,
  url: z.string().min(1, 'Invalid url: must not be empty'),
  headers: z.record(z.string()),
  body: z.unknown().optional(),
})

export type NetworkRequest = z.infer<typeof NetworkRequestSchema>

export const createNetworkRequest = (
  input: unknown
): ReadonlyDeep<NetworkRequest> =>
  NetworkRequestSchema.parse(input) as ReadonlyDeep<NetworkRequest>
