
import React from 'react'
import type { Widget } from '../../types'
import { useBuilderStore } from '../../store'

export const ImageWidget: React.FC<{ widget: Widget }> = ({ widget }) => {
  const { updateWidgetContent } = useBuilderStore()
  const { currentBreakpoint } = useBuilderStore()
  const styles = widget.styles[currentBreakpoint]

  return (
    <div className="relative">
      <img
        src={widget.content}
        alt="widget"
        className="w-full h-auto rounded-md"
        style={{
          borderRadius: styles.borderRadius,
          padding: styles.padding,
          objectFit: styles.objectFit,
        }}
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/300x200/cccccc/333333?text=Image+Error'
        }}
      />
      <input
        type="text"
        defaultValue={widget.content}
        onBlur={(e) => updateWidgetContent(widget.id, e.currentTarget.value)}
        className="mt-2 w-full bg-white text-xs p-1 border rounded-md"
      />
    </div>
  )
}
