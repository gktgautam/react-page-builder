
import React from 'react'
import { useBuilderStore } from '../../store'
import { SectionView } from '../Section/Section'

export const Canvas: React.FC = () => {
  const { data, addSection } = useBuilderStore()
  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 space-y-8 transition-all duration-300 max-w-6xl">
      {data.page.sections.length === 0 && (
        <div className="text-center text-gray-400 italic py-8">Add a section to get started.</div>
      )}
      {data.page.sections.map(sec => (
        <SectionView key={sec.id} section={sec} />
      ))}
      <div className="flex justify-center">
        <button onClick={addSection} className="px-3 py-2 bg-green-500 text-white rounded">Add Section</button>
      </div>
    </div>
  )
}
