import { z } from 'zod'

export const logInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(7, 'password must be at least 7 characters'),
})
