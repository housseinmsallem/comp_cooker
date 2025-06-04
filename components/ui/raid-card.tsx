'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sword, Shield, Zap } from 'lucide-react'
import { Star } from 'lucide-react'
export interface RaidCardProps {
  name?: string
  description?: string
  game?: string
  tier?: string
}

export default function RaidCard({
  name = 'Default',
  description = 'Figure it out.',
  game = 'Default role',
  tier = 'Default tier',
}: RaidCardProps) {
  return (
    <div className="bg-slate-800 w-80 h-64 rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="p-6 h-full flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-semibold text-white truncate">
              {name}
            </h3>
            <span className="bg-sky-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {game}
            </span>
          </div>
          <p className="text-slate-400 text-sm mb-6 line-clamp-3">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-yellow-400">
              <Star />
            </span>
            <span className="text-slate-300 font-medium">{tier}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
