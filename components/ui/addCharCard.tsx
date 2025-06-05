'use client'
import React from 'react'
import { CirclePlus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import CharForm from './char-form'

const AddCharCard = ({ raidId }: { raidId: number }) => {
  return (
    <Dialog>
      <div>
        <div className="bg-slate-800/70 border-2 border-dashed border-slate-600 rounded-xl shadow-lg flex flex-col items-center justify-center p-6 min-h-[200px] hover:bg-slate-700/50 transition-colors duration-300">
          <DialogTrigger className="cursor-pointer">
            <CirclePlus color="#90A1B9" size={64} />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a Character</DialogTitle>
              <DialogDescription>
                Prepare the composition and share with friends
              </DialogDescription>
            </DialogHeader>
            <CharForm raidId={raidId} />
          </DialogContent>
          <p className="text-slate-400 font-medium">Add Role</p>
          <p className="text-slate-500 text-sm text-center">
            Click to select a character for this slot.
          </p>
        </div>
      </div>
    </Dialog>
  )
}

export default AddCharCard
