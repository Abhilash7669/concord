import { z } from "zod";

export const userSignUpSchema = z.object({
    name: z.string({ required_error: 'This field is required' }).min(4),
    userName: z.
        string(
            { 
                required_error: 'Please provide a username', 
                message: "Provide a username with minimum character length of 4" 
            }
        )
        .min(4),
    email: z.string({ required_error: "Email is required", message: "Please provide a valid email" }).email(),
    password: z.string({ required_error: "Password is required" }).min(8, { message: "Password must be minimum 8 characters long" })
});
