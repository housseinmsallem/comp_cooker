'use server'

import { db } from '@/db'
import { raidsTable } from '@/db/schema'
import { z } from 'zod'
import { ActionResponse } from './user'
import { getSession } from '@/lib/auth'
const compSchema = z.object({
  name: z.string().min(1, 'Name is missing'),
  game: z.string().min(1, 'Game is missing'),
})
export type compData = z.infer<typeof compSchema>
export const createCompAction = async (formData: FormData) => {
  try {
    const session = await getSession()
    if (!session) {
      return {
        success: false,
        message: 'Error Checking session',
      }
    }
    const data = {
      name: formData.get('name') as string,
      game: formData.get('game') as string,
      userId: Number(session.userId),
    }
    const validationResult = compSchema.safeParse(data)
    if (!validationResult.success) {
      return {
        success: false,
        message: 'Error Creating Comp, missing fields',
        errors: validationResult.error.flatten().fieldErrors,
      }
    }
    const result = await createComp(data.name, data.game, data.userId)
    if (!result) {
      return {
        success: false,
        message: 'Error Creating Comp, Our Fault',
        error: 'Error Creating Comp, Our Fault',
      }
    }
    return {
      success: true,
      message: 'Comp Created Successfully',
    }
  } catch (err) {
    console.error('Unexpected Error', err)
    return {
      success: false,
      message: 'Error Creating Comp, Unexpected Error',
      error: 'Error Creating Comp, Unexpected Error',
    }
  }
}
export const createComp = async (
  name: string,
  game: string,
  userId: number
) => {
  try {
    await db.insert(raidsTable).values({
      name,
      game,
      userId,
    })
    return { name, game, userId }
  } catch (error) {
    console.error('Error creating Comp:', error)
    return null
  }
}
