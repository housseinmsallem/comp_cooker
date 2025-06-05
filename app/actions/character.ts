'use server'

import { db } from '@/db'
import { characterTable, raidsTable } from '@/db/schema'
import { z } from 'zod'
import { ActionResponse } from './user'
const charSchema = z.object({
  name: z.string().min(1, 'Name is missing'),
  description: z.string().min(1, 'description is missing'),
  role: z.string().min(1, 'role is missing'),
  tier: z.string().min(1, 'tier is missing'),
  raidId: z
    .number({
      required_error: 'Raid ID is required',
      invalid_type_error: 'Raid ID must be a number',
    })
    .int('Raid ID must be an integer')
    .positive('Raid ID must be positive'),
})
export type charData = z.infer<typeof charSchema>
export const createCharAction = async (formData: FormData) => {
  try {
    const data = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      role: formData.get('role') as string,
      tier: formData.get('tier') as string,
      raidId: Number(formData.get('raidId')),
    }
    const validationResult = charSchema.safeParse(data)
    if (!validationResult.success) {
      return {
        success: false,
        message: 'Error Creating Comp, missing fields',
        errors: validationResult.error.flatten().fieldErrors,
      }
    }
    const result = await createChar(
      data.name,
      data.description,
      data.role,
      data.tier,
      data.raidId
    )
    if (!result) {
      return {
        success: false,
        message: 'Error Creating Character, Our Fault',
        error: 'Error Creating Character, Our Fault',
      }
    }
    return {
      success: true,
      message: 'Character Created Successfully',
    }
  } catch (err) {
    console.error('Unexpected Error', err)
    return {
      success: false,
      message: 'Error Creating Character, Unexpected Error',
      error: 'Error Creating Character, Unexpected Error',
    }
  }
}
export const createChar = async (
  name: string,
  description: string,
  role: string,
  tier: string,
  raidId: number
) => {
  try {
    await db.insert(characterTable).values({
      name,
      description,
      role,
      tier,
      raidId,
    })
    return { name, description, role, tier, raidId }
  } catch (error) {
    console.error('Error creating Character:', error)
    return null
  }
}
