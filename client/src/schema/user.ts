import { z } from "zod";

export const emailUpdateSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
});

export type EmailUpdateSchema = z.infer<typeof emailUpdateSchema>;

export const nameUpdateSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." }),
});

export type NameUpdateSchema = z.infer<typeof nameUpdateSchema>;
