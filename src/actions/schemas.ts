import { z } from 'zod'

export const logInSchema = z.object({
  email: z.string().email(), 
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const signUpSchema = z.object({
  email: z.string().email(), 
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const createPostSchema = z.object({
  title: z.string().min(3, 'The title must be at least three characters'),
  content: z.string().optional()
  
})