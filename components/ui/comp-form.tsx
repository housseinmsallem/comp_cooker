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

const CompForm = () => {
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async(prevState:ActionResponse,formData:FormData)=>{
    try{
      await 
    }catch{}
  },initialState)

  return (
    <Card className="w-full max-w-sm">
      <form>
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
            </div>
            <div className="grid gap-2">
              <Label htmlFor="game">Game</Label>
              <Input id="game" type="game" name="game" required />
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
