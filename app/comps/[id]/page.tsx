import AddCharCard from '@/components/ui/addCharCard'
import AddPlayer from '@/components/ui/addCharCard'
import PlayerCard from '@/components/ui/player-card'
import { getSession } from '@/lib/auth'
import { getCharsByRaidId } from '@/lib/dal'

import React from 'react'

const RaidPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const characters = await getCharsByRaidId(parseInt(id))
  return (
    <>
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {characters?.map((character) => (
          <PlayerCard
            name={character.name}
            description={character.description}
            role={character.role}
            tier={character.tier}
          />
        ))}
        <AddCharCard raidId={parseInt(id)} />
      </main>
    </>
  )
}

export default RaidPage
