
import React from 'react'
import { useBuilderStore } from '../../store'

export const BaseWidgetFrame: React.FC<{ selectedId: string; onSelect: (e: React.MouseEvent) => void; children: React.ReactNode }> = ({ selectedId, onSelect, children }) => {
  const { selected, deleteWidget } = useBuilderStore()
  const isSelected = selected?.widgetId === selectedId
  return (
    <div onClick={onSelect} className={`cursor-pointer relative group transition-all duration-100 ${isSelected ? 'outline outline-2 outline-blue-500 rounded-md' : 'rounded-md'}`}>
      {children}
      <div className="absolute top-0 right-0 m-1 flex gap-1 opacity-0 group-hover:opacity-100">
        <button onClick={(e) => { e.stopPropagation(); deleteWidget(selectedId) }} className="p-1.5 rounded-full bg-red-500 text-white">🗑️</button>
      </div>
    </div>
  )
}
