import {z} from "zod";

// Login Zod Schema
export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string({
      message: "Password must be 1 uppercase, special, 1 number!",
    })
});


// Signup Schema
export const SignupSchema = z
  .object({
    name: z
      .string({ error: "Name should be string" })
      .min(2, { message: "Name must be at least 3 characters" })
      .max(50, { message: "Name too long. Maximum length 50" }),
    email: z.email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 length" })
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/, {
        message:
          "Password must be at least 1 uppercase character, 1 special character, 1 number and at least 6 character",
      }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 length" })
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/, {
        message:
          "Password must be at least 1 uppercase character, 1 special character, 1 number and at least 6 character",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
