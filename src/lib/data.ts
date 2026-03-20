import * as z from 'zod'

// Validation object used by Zod (JSON body)
export const bodyObj = z.object({
    param_1: z.string(),
    param_2: z.string(),
})

export type BodyObj = z.infer<typeof bodyObj>

// Validation object used by Zod: query parameter
export const paramObj = z.object({
    param: z.string(),
})
