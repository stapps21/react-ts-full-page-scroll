import React, { createContext, useContext, useState } from 'react'

type FullpageContextType = {
  activePage: number
  setActivePage: (index: number) => void
  transitionDuration: number
  childRefs: React.RefObject<HTMLDivElement>[]
  setChildRefs: React.Dispatch<React.SetStateAction<React.RefObject<HTMLDivElement>[]>>
}

const FullpageContext = createContext<FullpageContextType | undefined>(undefined)

type FullpageProviderProps = {
  children: React.ReactNode
}

export const FullpageProvider: React.FC<FullpageProviderProps> = ({ children }) => {
  const [childRefs, setChildRefs] = useState<React.RefObject<HTMLDivElement>[]>([])
  const [activePage, setActivePage] = useState(-1)
  const transitionDuration = 500

  return (
    <FullpageContext.Provider
      value={{
        activePage,
        setActivePage,
        transitionDuration,
        childRefs,
        setChildRefs,
      }}
    >
      {children}
    </FullpageContext.Provider>
  )
}

export const useFullpageContext = () => {
  const context = useContext(FullpageContext)
  if (context === undefined) {
    throw new Error('useFullpageContext must be used within a FullpageProvider')
  }
  return context
}
