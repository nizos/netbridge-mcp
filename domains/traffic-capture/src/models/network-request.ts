import type { ReadonlyDeep } from 'type-fest'
import { z } from 'zod'

const HttpMethodSchema = z
  .enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'])
  .describe('HTTP method')

export const NetworkRequestSchema = z.object({
  id: z.string().min(1, 'ID cannot be empty'),
  timestamp: z.number().positive('Timestamp must be positive'),
  method: HttpMethodSchema,
  url: z.string().min(1, 'URL cannot be empty'),
  headers: z.record(z.string()),
  body: z.unknown().optional(),
})

export type NetworkRequest = z.infer<typeof NetworkRequestSchema>

export const createNetworkRequest = (
  input: unknown
): ReadonlyDeep<NetworkRequest> => {
  const parsed = NetworkRequestSchema.parse(input)
  return parsed as ReadonlyDeep<NetworkRequest>
}
