import type { ReadonlyDeep } from 'type-fest'
import { z } from 'zod'

export const NetworkResponseSchema = z.object({
  status: z.number(),
  statusText: z.string(),
  headers: z.record(z.string()),
})

export type NetworkResponse = z.infer<typeof NetworkResponseSchema>

export const createNetworkResponse = (
  input: unknown
): ReadonlyDeep<NetworkResponse> => {
  const parsed = NetworkResponseSchema.parse(input)
  return parsed as ReadonlyDeep<NetworkResponse>
}
