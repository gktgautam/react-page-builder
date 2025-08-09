
import React from 'react'
import type { Section } from '../../types'
import { useBuilderStore } from '../../store'
import { ColumnView } from '../Column/Column'

export const SectionView: React.FC<{ section: Section }> = ({ section }) => {
  const { selectSection, deleteSection, currentBreakpoint } = useBuilderStore()
  const styles = section.styles[currentBreakpoint]

  return (
    <div className="border-2 border-dashed rounded-xl p-4 relative">
      <div className="absolute -top-10 left-1/2 -translate-x-1/2">
        <button onClick={() => deleteSection(section.id)} className="p-1.5 rounded-full bg-red-500 text-white">✕</button>
      </div>
      <div onClick={() => selectSection(section.id)} className={`flex ${styles.isGrid ? 'flex-row' : 'flex-col'}`} style={{ gap: styles.gap }}>
        {section.columns.map(col => (
          <ColumnView key={col.id} sectionId={section.id} column={col} isGrid={styles.isGrid} />
        ))}
      </div>
    </div>
  )
}
