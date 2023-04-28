import React, { ReactNode } from 'react'
import { FullpageProvider } from '../contexts/FullpageContext'
import { validateChildren } from '../utils/validateChildren'
import { ScrollContent } from './ScrollContent'
import { FixedContent } from './FixedContent'
import { useScroll } from '../hooks/useScroll'

type FullpageContainerProps = {
  children: ReactNode
}

export const FullpageContainer: React.FC<FullpageContainerProps> = ({ children }) => {
  if (!validateChildren(children, [ScrollContent, FixedContent])) {
    throw new Error('FullpageContainer accepts only ScrollContent and FixedContent as children.')
  }

  return (
    <FullpageProvider>
      <ScrollHandler>{children}</ScrollHandler>
    </FullpageProvider>
  )
}

type ScrollHandlerProps = {
  children: ReactNode
}

const ScrollHandler: React.FC<ScrollHandlerProps> = ({ children }) => {
  useScroll()
  return <div style={{ position: 'relative', overflow: 'hidden', height: '100vh' }}>{children}</div>
}
