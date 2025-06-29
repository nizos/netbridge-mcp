import type { ReadonlyDeep } from 'type-fest'
import { z } from 'zod'

export const NetworkResponseSchema = z.object({
  status: z.number().int().min(100).max(599, 'Invalid HTTP status code'),
  statusText: z.string(),
  headers: z.record(z.string()),
  body: z.unknown().optional(),
})

export type NetworkResponse = z.infer<typeof NetworkResponseSchema>

export const createNetworkResponse = (
  input: unknown
): ReadonlyDeep<NetworkResponse> => {
  const parsed = NetworkResponseSchema.parse(input)
  return parsed as ReadonlyDeep<NetworkResponse>
}
