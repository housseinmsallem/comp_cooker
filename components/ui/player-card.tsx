'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sword, Shield, Zap } from 'lucide-react'
import { Star } from 'lucide-react'
interface PlayerCardProps {
  name?: string
  className?: string
  description?: string
  role?: string
  tier?: string
}

export default function PlayerCard({
  name = 'Default',
  description = 'Figure it out.',
  role = 'Default role',
  tier = 'Default tier',
}: PlayerCardProps) {
  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-semibold text-white">{name}</h3>
          <span className="bg-sky-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {role}
          </span>
        </div>
        <p className="text-slate-400 text-sm mb-6">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="material-icons text-yellow-400">
              <Star />
            </span>
            <span className="text-slate-300 font-medium">{tier}</span>
          </div>
          <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center space-x-2">
            <span className="material-icons text-sm">person_add</span>
            <span>Assign</span>
          </button>
        </div>
      </div>
    </div>
  )
}
