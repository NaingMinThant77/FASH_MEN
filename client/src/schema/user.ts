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

export const passwordUpdateSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, { message: "Old Password must be at least 6 characters long." }),
    newPassword: z
      .string()
      .min(6, { message: "New Password must be at least 6 characters long." }),
    confirmPassword: z.string().min(6, {
      message: "Confirm Password must be at least 6 characters long.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type PasswordUpdateSchema = z.infer<typeof passwordUpdateSchema>;
