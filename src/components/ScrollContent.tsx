import React, { CSSProperties, ReactNode, RefObject, useEffect, useMemo, useState } from 'react'
import { Page } from './Page'
import { validateChildren } from '../utils/validateChildren'
import { useFullpageContext } from '../contexts/FullpageContext'

type ScrollContentProps = {
  children: ReactNode
}

export const ScrollContent: React.FC<ScrollContentProps> = ({ children }) => {
  const { setChildRefs /*setActivePage*/ } = useFullpageContext()
  const [childRefs, setLocalChildRefs] = useState<RefObject<HTMLDivElement>[]>([])

  if (!validateChildren(children, [Page])) {
    throw new Error('ScrollContent accepts only Page components as children.')
  }

  useEffect(() => {
    const newChildRefs = React.Children.map(children, () => {
      return React.createRef<HTMLDivElement>()
    })

    if (newChildRefs) {
      setLocalChildRefs(newChildRefs)
      setChildRefs(newChildRefs)
    }
  }, [children, setChildRefs])

  const childrenWithRefs = useMemo(() => {
    return React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        const ref = childRefs[index]

        return React.cloneElement(child, {
          ...child.props,
          index,
          ref,
        })
      }
      return child
    })
  }, [children, childRefs])

  const preventDefaultActions: CSSProperties = {
    scrollBehavior: 'unset',
    touchAction: 'none',
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
        ...preventDefaultActions,
      }}
    >
      {childrenWithRefs}
    </div>
  )
}
