import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { usersTable } from '@/db/schema'
import { getUserByEmail } from '@/lib/dal'
import { z } from 'zod'
import { createUser } from '@/lib/auth'
const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
})

const signUpSchema = z
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

export type SignInData = z.infer<typeof signInSchema>
export type SignUpData = z.infer<typeof signUpSchema>
export const signInAction = async (formData: FormData) => {}
export const signUpAction = async (formData: FormData) => {
  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  const validationResult = signInSchema.safeParse(data)
  if (!validationResult.success) {
    return {
      success: false,
      message: 'Validation failed',
      errors: validationResult.error.flatten().fieldErrors,
    }
  }
  const existingUser = await getUserByEmail(data.email)
  if (existingUser) {
    return {
      success: false,
      message: 'Email Exists',
      errors: { email: ['Email exists'] },
    }
  }
  const user = await createUser(data.name, data.email, data.password)
  
}
