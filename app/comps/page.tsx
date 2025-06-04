'use cache'
import AddPlayer from '@/components/ui/add-card'
import { getSession } from '@/lib/auth'
import { getRaidsByUserId } from '@/lib/dal'
import RaidCard from '@/components/ui/raid-card'
import React from 'react'

import { RaidCardProps } from '@/components/ui/raid-card'
const RaidListPage = async () => {
  const userId = await getSession()
  const raids = await getRaidsByUserId(Number(userId))
  return (
    <>
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {raids?.map((raid: RaidCardProps) => (
          <RaidCard
            name={raid.name}
            description={raid.description}
            game={raid.game}
            tier={raid.tier}
          />
        ))}
        {<AddPlayer />}
      </main>
    </>
  )
}

export default RaidListPage
