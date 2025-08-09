
import React from 'react'
import type { Column } from '../../types'
import { useBuilderStore } from '../../store'
import { WidgetRenderer } from '../Widgets/WidgetRenderer'
import { defaultTextStyles, defaultButtonStyles, defaultConversionButtonStyles, defaultImageStyles } from './defaults'

export const ColumnView: React.FC<{ sectionId: string; column: Column; isGrid: boolean }> = ({ sectionId, column, isGrid }) => {
  const { addWidget } = useBuilderStore()
  return (
    <div className={`p-4 bg-gray-100 rounded-lg ${isGrid ? 'flex-1' : ''}`}>
      {column.widgets.map(w => (
        <div key={w.id} className="mb-4"><WidgetRenderer widget={w} /></div>
      ))}
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => addWidget(sectionId, column.id, 'text', defaultTextStyles, 'Sample Text Block')} className="text-xs bg-gray-200 px-3 py-1 rounded">+ Text</button>
        <button onClick={() => addWidget(sectionId, column.id, 'button', defaultButtonStyles, 'Click Me')} className="text-xs bg-gray-200 px-3 py-1 rounded">+ Button</button>
        <button onClick={() => addWidget(sectionId, column.id, 'conversion-button', defaultConversionButtonStyles, 'Get Started Now!')} className="text-xs bg-gray-200 px-3 py-1 rounded">+ Convert</button>
        <button onClick={() => addWidget(sectionId, column.id, 'image', defaultImageStyles, 'https://placehold.co/300x200/cccccc/333333?text=Image')} className="text-xs bg-gray-200 px-3 py-1 rounded">+ Image</button>
      </div>
    </div>
  )
}
