
import React from 'react'
import type { Widget } from '../../types'
import { BaseWidgetFrame } from './BaseWidgetFrame'
import { TextWidget } from './TextWidget'
import { ButtonWidget } from './ButtonWidget'
import { ConversionButtonWidget } from './ConversionButtonWidget'
import { ImageWidget } from './ImageWidget'
import { useBuilderStore } from '../../store'

export const WidgetRenderer: React.FC<{ widget: Widget }> = ({ widget }) => {
  const { selectWidget } = useBuilderStore()
  const onSelect = (e: React.MouseEvent) => { e.stopPropagation(); selectWidget(widget.id) }

  return (
    <BaseWidgetFrame selectedId={widget.id} onSelect={onSelect}>
      {widget.type === 'text' && <TextWidget widget={widget} />}
      {widget.type === 'button' && <ButtonWidget widget={widget} />}
      {widget.type === 'conversion-button' && <ConversionButtonWidget widget={widget} />}
      {widget.type === 'image' && <ImageWidget widget={widget} />}
    </BaseWidgetFrame>
  )
}
