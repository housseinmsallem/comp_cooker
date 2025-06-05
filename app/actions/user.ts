'use server'
import { hashpassword } from './../../lib/auth'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { usersTable } from '@/db/schema'
import { getUserByEmail } from '@/lib/dal'
import { z } from 'zod'
import { createSession, createUser, verifyPassword } from '@/lib/auth'
import { compare, hash } from 'bcrypt'
const SignInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
})

const SignUpSchema = z
  .object({
    name: z.string().min(1, 'name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type SignInData = z.infer<typeof SignInSchema>
export type SignUpData = z.infer<typeof SignUpSchema>

export type ActionResponse = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
  error?: string
}
export const signInAction = async (formData: FormData) => {
  try {
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }
    const validationResult = SignInSchema.safeParse(data)
    if (!validationResult.success) {
      return {
        success: false,
        message: 'Invalid Email or Password',
        errors: validationResult.error.flatten().fieldErrors,
      }
    }
    const user = await getUserByEmail(data.email)
    if (!user) {
      return {
        success: false,
        message: 'Invalid email or password',
        error: 'Invalid email or password',
      }
    }
    const validatePassword = await verifyPassword(
      data.password,
      user[0].password
    )
    if (!validatePassword) {
      return {
        success: false,
        message: 'Invalid Email or password',
        error: 'Invalid Email or password',
        password: data.password,
      }
    }
    await createSession(user[0].id.toString())
    return {
      
      success: true,
      message: 'Session created successfully',
    }
  } catch (err) {
    return {
      success: false,
      message: 'Error during signIn',
    }
  }
}
export const signUpAction = async (formData: FormData) => {
  try {
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    }
    const validationResult = SignUpSchema.safeParse(data)
    if (!validationResult.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.flatten().fieldErrors,
      }
    }
    const existingUser = await getUserByEmail(data.email)
    if (Array.isArray(existingUser) && existingUser.length > 0) {
      //Checking iif this guy is an empty array or not
      console.log(existingUser)
      return {
        success: false,
        message: 'Email Exists',
        errors: { email: ['Email exists'] },
      }
    }
    const user = await createUser(data.name, data.email, data.password)
    if (!user) {
      return {
        success: false,
        message: 'User creation failed',
        error: 'User creation failed',
      }
    }
    await createSession(user.id.toString())
    return {
      success: true,
      message: 'Session created successfully',
    }
  } catch (err) {
    return {
      success: false,
      message: 'Error during SignUp',
      error: err,
    }
  }
}
