import { z } from "zod";

export const userLoginSchema = z.object({
    email: z.string({ required_error: "Email is required" }).email({ message: "Please provide a valid email" }),
    password: z.string({ required_error: "Password is required" }).nonempty({ message: "Password cannot be empty" })
});
