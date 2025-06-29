import type { ReadonlyDeep } from 'type-fest'
import { z } from 'zod'

export const NetworkResponseSchema = z.object({
  status: z
    .number()
    .int()
    .min(100)
    .max(599, 'Invalid status: must be between 100 and 599'),
  statusText: z.string(),
  headers: z.record(z.string()),
  body: z.unknown().optional(),
})

export type NetworkResponse = z.infer<typeof NetworkResponseSchema>

export const createNetworkResponse = (
  input: unknown
): ReadonlyDeep<NetworkResponse> =>
  NetworkResponseSchema.parse(input) as ReadonlyDeep<NetworkResponse>
