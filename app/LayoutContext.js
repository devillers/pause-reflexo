// app/LayoutContext.js (Client Component)
'use client'
import { createContext, useContext, useState } from 'react'

const LayoutContext = createContext()

export function LayoutProvider({ children }) {
  const [hideLayout, setHideLayout] = useState(false)
  const [isBlurred, setIsBlurred] = useState(false) // <-- ajoute ceci

  return (
    <LayoutContext.Provider value={{
      hideLayout, setHideLayout,
      isBlurred, setIsBlurred,      // <-- expose le nouvel état
    }}>
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  return useContext(LayoutContext)
}
