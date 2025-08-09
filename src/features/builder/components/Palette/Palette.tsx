
import React from 'react'
import { WidgetPalette } from './WidgetPalette'
import { SectionPalette } from './SectionPalette'

export const Palette: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-2xl font-extrabold text-blue-800">Inspector</h2>
      </div>
      <div className="p-4 border-b border-gray-200">
        <WidgetPalette />
      </div>
      <div className="p-4 border-b border-gray-200">
        <SectionPalette />
      </div>
    </div>
  )
}
