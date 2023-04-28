import React, { ReactNode } from 'react'

type FixedContentProps = {
  children: ReactNode
}

export const FixedContent: React.FC<FixedContentProps> = ({ children }) => {
  return <div style={{ position: 'fixed', zIndex: 1000, width: '100%' }}>{children}</div>
}
