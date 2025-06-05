import { Label } from '@radix-ui/react-label'
import { Link } from 'lucide-react'
import React, { useActionState } from 'react'
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
import toast from 'react-hot-toast'
import { FormError } from './form-error'
import { createCharAction } from '@/app/actions/character'
import { Textarea } from './textarea'

const initialState = {
  success: false,
  message: '',
  errors: undefined,
}
const CharForm = () => {
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    try {
      const result = await createCharAction(formData)
      if (result.success) {
        toast.success('Comp created successfully')
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
          <CardTitle>Create a Character</CardTitle>
          <CardDescription>Do you thing.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="ex:Healer Dps 2v2"
                name="name"
                required
              />
              {state?.errors?.name && (
                <p className="text-sm text-red-500">{state.errors.name[0]}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" type="text" name="role" required />
              {state?.errors?.role && (
                <p className="text-sm text-red-500">{state.errors.role[0]}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tier">Tier</Label>
              <Input id="tier" type="text" name="tier" required />
              {state?.errors?.tier && (
                <p className="text-sm text-red-500">{state.errors.tier[0]}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" required />
              {state?.errors?.description && (
                <p className="text-sm text-red-500">
                  {state.errors.description[0]}
                </p>
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

export default CharForm
