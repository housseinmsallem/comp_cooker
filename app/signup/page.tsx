'use client'
import React, { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { ActionResponse, signUpAction } from '../actions/user'
import { useRouter } from 'next/navigation'
import { FormError } from '@/components/ui/FormError'

const initialState = {
  success: false,
  message: '',
  errors: undefined,
}
const SignUpPage = () => {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    try {
      const result = await signUpAction(formData)
      if (result.success) {
        toast.success('Account created successfully')
        router.push('/comps')
      }
      return result
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : typeof err === 'string'
          ? err
          : 'An unknown error occurred'

      return {
        success: false,
        message: errorMessage,
        error: errorMessage, // ✅ now guaranteed to be a string
        errors: undefined,
      }
    }
  }, initialState)
  return (
    <Card className="w-full max-w-sm">
      <form action={formAction}>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">
              <Link href="signin">Sign In</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              {state?.message && !state.success && (
                <FormError>{state.message}</FormError>
              )}
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                name="email"
                required
              />
              {state?.errors?.email && (
                <p id="email-error" className="text-sm text-red-500">
                  {state.errors.email[0]}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="name"
                placeholder="taco"
                name="name"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" name="password" required />

              {state?.errors?.password && (
                <p id="password-error" className="text-sm text-red-500">
                  {state.errors.password[0]}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Confirm Password</Label>
            </div>
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              required
            />
            {state?.errors?.confirmPassword && (
              <p id="password-error" className="text-sm text-red-500">
                {state.errors.confirmPassword[0]}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default SignUpPage
