
import React from 'react'
import type { Widget } from '../../types'
import { useBuilderStore } from '../../store'

export const ButtonWidget: React.FC<{ widget: Widget }> = ({ widget }) => {
  const { updateWidgetContent } = useBuilderStore()
  const { currentBreakpoint } = useBuilderStore()
  const styles = widget.styles[currentBreakpoint]

  return (
    <div className="relative">
      <button
        style={{
          padding: styles.padding,
          color: styles.color,
          fontSize: styles.fontSize,
          backgroundColor: styles.backgroundColor,
          textAlign: styles.textAlign,
          fontWeight: styles.fontWeight,
          fontFamily: styles.fontFamily,
          borderRadius: styles.borderRadius,
        }}
        className="w-full h-full font-medium shadow-md hover:shadow-lg transition-all duration-200"
        onMouseDown={(e) => e.preventDefault()}
      >
        {widget.content}
      </button>
      <input
        type="text"
        defaultValue={widget.content}
        onBlur={(e) => updateWidgetContent(widget.id, e.currentTarget.value)}
        className="mt-2 w-full bg-white text-xs p-1 border rounded-md"
      />
    </div>
  )
}
