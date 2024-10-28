import { z } from 'zod'

export const logInSchema = z.object({
  email: z.string().email(), 
  password: z.string().min(6, 'Sure you got the right password? It must be at least 6 characters'),
})

export const signUpSchema = z.object({
  email: z.string().email(), 
  // username: z-string().username(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})