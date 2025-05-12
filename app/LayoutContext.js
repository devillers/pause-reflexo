// app/LayoutContext.js (Client Component)
'use client'
import { createContext, useContext, useState } from 'react'

const LayoutContext = createContext()

export function LayoutProvider({ children }) {
  const [hideLayout, setHideLayout] = useState(false)
  return (
    <LayoutContext.Provider value={{ hideLayout, setHideLayout }}>
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  return useContext(LayoutContext)
}
