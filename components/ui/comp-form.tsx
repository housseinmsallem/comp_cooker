'use client'
import { Label } from '@radix-ui/react-label'
import { Link } from 'lucide-react'
import React, { startTransition, useActionState, useTransition } from 'react'
import { Button } from './button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from './card'
import { Input } from './input'
import { ActionResponse } from '@/app/actions/user'
import { createCompAction } from '@/app/actions/comp'
import toast from 'react-hot-toast'
import { FormError } from './form-error'
import { redirect, useRouter } from 'next/navigation'

const initialState = {
  success: false,
  message: '',
  errors: undefined,
}
const CompForm = () => {
  const router = useRouter()
  const [isLoading, startTransition] = useTransition()
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    try {
      const result = await createCompAction(formData)
      if (result.success) {
        toast.success('Comp created successfully')
        startTransition(() => {
          router.refresh()
        })
      }
      return result
    } catch (err) {
      return {
        success: false,
        message: (err as Error).message || 'An error occurred',
        errors: undefined,
      }
    }
  }, initialState)

  return (
    <Card className="w-full max-w-sm">
      <form action={formAction}>
        {state?.message && state?.success && (
          <FormError>{state.message}</FormError>
        )}
        <CardHeader>
          <CardTitle>Create a Composition</CardTitle>
          <CardDescription>
            Choose the according Game and make a comp.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="name"
                placeholder="ex:Healer Dps 2v2"
                name="name"
                required
              />
              {state?.errors?.name && (
                <p className="text-sm text-red-500">{state.errors.name[0]}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="game">Game</Label>
              <Input id="game" type="game" name="game" required />
              {state?.errors?.game && (
                <p className="text-sm text-red-500">{state.errors.game[0]}</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default CompForm
