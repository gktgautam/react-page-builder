
import React from 'react'
import type { Widget } from '../../types'
import { useBuilderStore } from '../../store'

export const TextWidget: React.FC<{ widget: Widget }> = ({ widget }) => {
  const { updateWidgetContent } = useBuilderStore()
  const { currentBreakpoint } = useBuilderStore()
  const styles = widget.styles[currentBreakpoint]

  return (
    <p
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => updateWidgetContent(widget.id, e.currentTarget.textContent || '')}
      className="outline-none"
      style={{ fontSize: styles.fontSize, color: styles.color, fontFamily: styles.fontFamily, textAlign: styles.textAlign, fontWeight: styles.fontWeight, lineHeight: styles.lineHeight, padding: styles.padding, backgroundColor: styles.backgroundColor }}
    >
      {widget.content}
    </p>
  )
}
