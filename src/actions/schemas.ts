import { z } from "zod";

export const logInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Minimum 6 characters"),
});

export const signUpSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3, "Minimum 3 characters"),
  password: z.string().min(6, "Minimum 6 characters"),
});

export const postSchema = z.object({
  title: z.string().min(3, "Minimum 3 characters"),
  content: z.string().optional(),
});
