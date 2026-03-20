/**
 * Library file defining any commonly used data types
 */
import * as z from 'zod'

// validation object used by Zod (JSON body)
export const bodyObj = z.object({
    param_1: z.string(),
    param_2: z.string(),
})

// data type used to create the object
export type BodyObj = z.infer<typeof bodyObj>

// validation object used by Zod: query parameter
export const paramObj = z.object({
    param: z.string(),
})
