import { z } from "zod"



export const createUserSchema = z.object({
    email: z.string().min(8, "Email must contains be at least 8 characters").max(255).email(),
    password: z.string().min(4, "Password must contains be at least 4 characters")
})