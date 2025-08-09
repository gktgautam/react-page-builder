
import React from 'react'
import { LayoutGrid, Plus } from 'lucide-react'
import { useBuilderStore } from '../../store'

export const SectionPalette: React.FC = () => {
  const { addSection } = useBuilderStore()
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        <LayoutGrid size={20} className="mr-2" />
        Sections
      </h3>
      <button onClick={addSection} className="flex items-center gap-2 p-2 bg-gray-100 rounded">
        <Plus size={18} /> New Section
      </button>
    </div>
  )
}
