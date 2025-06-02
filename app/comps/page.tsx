import AddPlayer from '@/components/ui/add-player'
import PlayerCard from '@/components/ui/player-card'
import React from 'react'

const RaidsPage = () => {
  return (
    <>
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <PlayerCard />
        <AddPlayer />
      </main>
    </>
  )
}

export default RaidsPage
