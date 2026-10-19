import z from "zod";

export const signUpSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .trim()
    .min("2", { error: "Name must be at least 2 characters" }),
  photo: z.string().optional(),
  email: z.email({ error: "Invalid email address" }).trim().toLowerCase(),
  password: z
    .string({ error: "Password is required" })
    .min(6, { error: "Password must be at least 6 characters" })
    .max(20)
    .regex(/[A-Z]/, {
      error: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      error: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { error: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      error: "Password must contain at least one special character",
    }),
});
