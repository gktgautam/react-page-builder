
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BuilderApp from './features/builder/components/BuilderApp'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BuilderApp />
  </React.StrictMode>
)
