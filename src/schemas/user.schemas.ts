import z from "zod";

export const editProfileSchema = z.object({
    profession: z.string().min(1).max(255),
    city: z.string().min(1).max(255),
    country: z.string().min(1).max(255),
})