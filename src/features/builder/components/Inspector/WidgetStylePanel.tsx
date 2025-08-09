
import React from 'react'
import { useBuilderStore } from '../../store'

export const WidgetStylePanel: React.FC<{ widgetId: string }> = ({ widgetId }) => {
  const { data, currentBreakpoint, updateWidgetStyles } = useBuilderStore()
  const widget = data.page.sections.flatMap(s => s.columns).flatMap(c => c.widgets).find(w => w.id === widgetId)!
  const styles = widget.styles[currentBreakpoint]

  const renderInput = (label: string, key: string, type: string = 'text', unit: string = '') => (
    <div key={key}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        defaultValue={styles[key] || ''}
        placeholder={widget.styles.desktop[key] || ''}
        onBlur={(e) => updateWidgetStyles(widgetId, { [key]: `${e.currentTarget.value}${unit}` })}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  )

  const renderRange = (label: string, key: string, min: number, max: number, step: number = 1, unit: string = 'px') => (
    <div key={key}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-2 mt-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          defaultValue={parseInt(styles[key]) || 0}
          onChange={(e) => updateWidgetStyles(widgetId, { [key]: `${e.currentTarget.value}${unit}` })}
          className="flex-1"
        />
        <span className="text-sm text-gray-500 w-12 text-right">{styles[key]}</span>
      </div>
    </div>
  )

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-2">Edit {widget.type}</h3>
      {renderRange('Padding', 'padding', 0, 32, 1, 'px')}
      {renderRange('Border Radius', 'borderRadius', 0, 50, 1, 'px')}

      {widget.type === 'text' && (
        <>
          {renderRange('Font Size', 'fontSize', 10, 48, 1, 'px')}
          {renderRange('Line Height', 'lineHeight', 1, 3, 0.1, 'em')}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Text Align</label>
            <select defaultValue={styles.textAlign || 'left'} onChange={(e) => updateWidgetStyles(widgetId, { textAlign: e.currentTarget.value })} className="w-full border rounded p-1">
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Weight</label>
            <select defaultValue={styles.fontWeight || '400'} onChange={(e) => updateWidgetStyles(widgetId, { fontWeight: e.currentTarget.value })} className="w-full border rounded p-1">
              <option value="400">Normal</option>
              <option value="700">Bold</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Family</label>
            <select defaultValue={styles.fontFamily || 'Inter, sans-serif'} onChange={(e) => updateWidgetStyles(widgetId, { fontFamily: e.currentTarget.value })} className="w-full border rounded p-1">
              <option value="Inter, sans-serif">Inter (Sans-serif)</option>
              <option value="Georgia, serif">Georgia (Serif)</option>
              <option value="Courier New, monospace">Courier (Monospace)</option>
            </select>
          </div>
        </>
      )}

      {(widget.type === 'text' || widget.type === 'button' || widget.type === 'conversion-button') && (
        <>
          {renderInput('Text Color', 'color', 'color')}
        </>
      )}

      {(widget.type === 'button' || widget.type === 'conversion-button') && (
        <>
          {renderInput('Background Color', 'backgroundColor', 'color')}
        </>
      )}

      {widget.type === 'image' && (
        <>
          {renderInput('Image URL', 'content')}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Object Fit</label>
            <select defaultValue={styles.objectFit || 'cover'} onChange={(e) => useBuilderStore.getState().updateWidgetStyles(widgetId, { objectFit: e.currentTarget.value })} className="w-full border rounded p-1">
              <option value="cover">Cover</option>
              <option value="contain">Contain</option>
              <option value="fill">Fill</option>
              <option value="none">None</option>
            </select>
          </div>
        </>
      )}
    </div>
  )
}
