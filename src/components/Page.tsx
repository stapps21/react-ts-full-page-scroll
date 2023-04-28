import React, {
  CSSProperties,
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  useEffect,
  useState,
} from 'react'
import { useFullpageContext } from '../contexts/FullpageContext'

type PageProps = {
  children: ReactNode
  style?: CSSProperties
  className?: string
  index: number
}

export const Page: ForwardRefExoticComponent<PageProps & RefAttributes<HTMLDivElement>> = forwardRef<
  HTMLDivElement,
  PageProps
>(({ children, style, index, className = '' }, ref) => {
  const { activePage } = useFullpageContext()
  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    if (index <= activePage && !isAnimated) {
      setIsAnimated(true)
    }
  }, [activePage, index, isAnimated])

  const pageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'absolute',
    top: `${index * 100}vh`,
    bottom: 0,
  }

  const combinedClassName = isAnimated ? `${className} anim-page` : className

  return (
    <div ref={ref} style={{ ...style, ...pageStyle }} className={combinedClassName}>
      {children}
    </div>
  )
})

Page.displayName = 'Page'
