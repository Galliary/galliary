import { z } from 'zod'

export const email = z
  .string()
  .email()
  .transform((str: string) => str.toLowerCase().trim())

export const username = z
  .string()
  .min(2)
  .max(64)
  .transform((str) => str.trim())

export const nickname = z
  .string()
  .min(2)
  .max(64)
  .transform((str) => str.trim())

export const password = z
  .string()
  .min(10)
  .max(100)
  .transform((str) => str.trim())

export const bio = z
  .string()
  .min(0)
  .max(1000)
  .transform((str) => str.trim())

export const Signup = z.object({
  email,
  username,
  password,
})

export const UserEdit = z.object({
  nickname,
  username,
  email,
  bio
})

export const Login = z.object({
  email,
  password: z.string(),
})

export const ForgotPassword = z.object({
  email,
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
