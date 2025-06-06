import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sword, Shield, Zap } from 'lucide-react'
import { Star } from 'lucide-react'
import { Skeleton } from './skeleton'

export default function LoadingCard() {
  return (
    <div className="bg-slate-800 w-80 h-64 rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="p-6 h-full flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-semibold text-white truncate">
              <Skeleton />
            </h3>
            <span className="bg-sky-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              <Skeleton />
            </span>
          </div>
          <span className="text-slate-400 text-sm mb-6 line-clamp-3">
            <Skeleton />
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-yellow-400">
              <Star />
            </span>
            <span className="text-slate-300 font-medium">
              <Skeleton />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
