'use server'

import { db } from '@/db'
import { raidsTable } from '@/db/schema'

export const createCompAction = async (formData: FormData) => {
  try {
    const data = {
      name: formData.get('name'),
      game: formData.get('game'),
    }
    const validationResult = await db.insert(raidsTable).values()
  } catch {}
}
