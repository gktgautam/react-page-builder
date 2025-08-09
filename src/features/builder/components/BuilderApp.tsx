
import React, { useEffect, useState } from 'react'
import { useBuilderStore } from '../store'
import { save, load } from '../services/persist'
import { Canvas } from './Canvas/Canvas'
import { Inspector } from './Inspector/Inspector'
import { Palette } from './Palette/Palette'

export default function BuilderApp() {
  const { data, setBreakpoint } = useBuilderStore()
  const [saving, setSaving] = useState(false)

  useEffect(() => { (async () => { const saved = await load(); if (saved) useBuilderStore.getState().load(saved) })() }, [])

  const onSave = async () => { setSaving(true); await save(data); setSaving(false) }

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      <main className="flex-1 flex flex-col p-8 items-center">
        <header className="flex items-center justify-between w-full max-w-6xl mb-8">
          <h1 className="text-3xl font-extrabold text-blue-800">Unbounce Clone</h1>
          <div className="flex gap-2">
            <button onClick={onSave} className="px-4 py-2 bg-blue-500 text-white rounded-lg" disabled={saving}>
              {saving ? 'Saving…' : 'Save Page'}
            </button>
          </div>
        </header>

        <div className="flex justify-center gap-4 mb-6">
          {(['desktop','tablet','mobile'] as const).map(bp => (
            <button key={bp} onClick={() => setBreakpoint(bp)} className="p-3 rounded-lg bg-white shadow hover:bg-gray-100 capitalize">{bp}</button>
          ))}
        </div>

        <div className="w-full max-w-6xl flex gap-6">
          <div className="flex-1"><Canvas /></div>
          <aside className="w-80"><Inspector /></aside>
        </div>
      </main>
      <aside className="w-80 border-l bg-white"><Palette /></aside>
    </div>
  )
}
