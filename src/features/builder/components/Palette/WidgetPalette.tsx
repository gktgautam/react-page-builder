
import React from 'react'
import { Type, Image as ImageIcon, MinusSquare, CheckCircle, Plus } from 'lucide-react'
import { useBuilderStore } from '../../store'
import { defaultTextStyles, defaultButtonStyles, defaultConversionButtonStyles, defaultImageStyles } from '../Column/defaults'

export const WidgetPalette: React.FC = () => {
  const { data, addWidget } = useBuilderStore()
  const firstSection = data.page.sections[0]
  const firstColumn = firstSection?.columns[0]

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        Widgets
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <button className="flex items-center gap-2 p-2 bg-gray-100 rounded" onClick={() => firstSection && firstColumn && addWidget(firstSection.id, firstColumn.id, 'text', defaultTextStyles, 'Sample Text Block')}>
          <Type size={18} /> Text
        </button>
        <button className="flex items-center gap-2 p-2 bg-gray-100 rounded" onClick={() => firstSection && firstColumn && addWidget(firstSection.id, firstColumn.id, 'button', defaultButtonStyles, 'Click Me')}>
          <MinusSquare size={18} /> Button
        </button>
        <button className="flex items-center gap-2 p-2 bg-gray-100 rounded" onClick={() => firstSection && firstColumn && addWidget(firstSection.id, firstColumn.id, 'conversion-button', defaultConversionButtonStyles, 'Get Started Now!')}>
          <CheckCircle size={18} /> Convert
        </button>
        <button className="flex items-center gap-2 p-2 bg-gray-100 rounded" onClick={() => firstSection && firstColumn && addWidget(firstSection.id, firstColumn.id, 'image', defaultImageStyles, 'https://placehold.co/300x200/cccccc/333333?text=Image')}>
          <ImageIcon size={18} /> Image
        </button>
      </div>
      {!firstSection && <p className="text-xs text-gray-500 mt-2">Add a section to enable quick-add.</p>}
    </div>
  )
}
