import React from 'react'
import { CirclePlus } from 'lucide-react'
const AddPlayer = () => {
  return (
    <div>
      <div className="bg-slate-800/70 border-2 border-dashed border-slate-600 rounded-xl shadow-lg flex flex-col items-center justify-center p-6 min-h-[200px] hover:bg-slate-700/50 transition-colors duration-300">
        <CirclePlus color="#90A1B9" size={64} />
        <p className="text-slate-400 font-medium">Add Role</p>
        <p className="text-slate-500 text-sm text-center">
          Click to select a character for this slot.
        </p>
      </div>
    </div>
  )
}

export default AddPlayer
