
import React from 'react'
import { useBuilderStore } from '../../store'

export const SectionStylePanel: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const { data, currentBreakpoint, updateSectionLayout, updateSectionGap } = useBuilderStore()
  const section = data.page.sections.find(s => s.id === sectionId)!
  const styles = section.styles[currentBreakpoint]

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-2">Edit Section</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Layout</label>
        <div className="flex gap-2">
          <button
            onClick={() => updateSectionLayout(sectionId, false)}
            className={`flex-1 p-2 rounded-md ${!styles.isGrid ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Full Width
          </button>
          <button
            onClick={() => updateSectionLayout(sectionId, true)}
            className={`flex-1 p-2 rounded-md ${styles.isGrid ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Grid
          </button>
        </div>
      </div>
      {styles.isGrid && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Grid Gap</label>
          <input
            type="range"
            min={0}
            max={64}
            value={parseInt(styles.gap) || 0}
            onChange={(e) => updateSectionGap(sectionId, `${e.currentTarget.value}px`)}
            className="w-full"
          />
          <div className="text-sm text-center text-gray-500">{styles.gap}</div>
        </div>
      )}
    </div>
  )
}
