import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export const resetPasswordSchema = z
  .object({
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

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const forgetPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
});

export type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;
