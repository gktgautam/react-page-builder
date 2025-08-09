
import React from 'react'
import { useBuilderStore } from '../../store'
import { SectionStylePanel } from './SectionStylePanel'
import { WidgetStylePanel } from './WidgetStylePanel'

export const Inspector: React.FC = () => {
  const { selected } = useBuilderStore()
  if (!selected) return <div className="p-4 text-gray-500">Select a widget or section to edit styles.</div>
  return (
    <div className="p-4 border-l h-full bg-white">
      {selected.widgetId ? <WidgetStylePanel widgetId={selected.widgetId} /> : <SectionStylePanel sectionId={selected.sectionId!} />}
    </div>
  )
}
