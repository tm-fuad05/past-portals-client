import z from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min("2", { error: "Name must be at least 2 characters" })
    .optional(),
  photo: z
    .union([z.instanceof(File), z.url()])
    .optional()
    .nullable(),
});
