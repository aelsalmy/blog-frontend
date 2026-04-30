import { z } from "zod"

export const loginSchema = z.object({
    username: z.string().min(1).max(255),
    password: z.string().min(1).max(255),
})

export const registerSchema = z.object({
    username: z.string().min(1).max(255),
    email: z.email(),
    password: z.string().min(8).max(255),
    confirmPassword: z.string().min(8).max(255),
    profession: z.string().min(1).max(255),
    city: z.string().min(1).max(255),
    country: z.string().min(1).max(255),
})

export type CreateUserDto = z.infer<typeof registerSchema>