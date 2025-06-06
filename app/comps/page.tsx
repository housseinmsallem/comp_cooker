import { getSession } from '@/lib/auth'
import { getRaidsByUserId } from '@/lib/dal'
import RaidCard from '@/components/ui/raid-card'
import React from 'react'

import { RaidCardProps } from '@/components/ui/raid-card'
import AddCompCard from '@/components/ui/addCompCard'
import { redirect } from 'next/navigation'
const RaidListPage = async () => {
  const raids = await getRaidsByUserId()
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
        <AddCompCard />
      </main>
    </>
  )
}

export default RaidListPage
