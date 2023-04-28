import { useCallback, useEffect, useRef, useState } from 'react'
import { useFullpageContext } from '../contexts/FullpageContext'

const isRelevantKeyEvent = (event: KeyboardEvent): boolean =>
  ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)

export const useScroll = () => {
  const [isScrollLocked, setIsScrollLocked] = useState(false)
  const startScroll = useRef(0)
  const stopScroll = useRef(0)
  const startTimestamp = useRef(0)
  const thresholdPointerSpeed = 0.25 // Adjust this value according to your needs
  const thresholdPointer = 5 // Adjust this value according to your needs
  const thresholdWheel = 50 // Adjust this value according to your needs

  const { setActivePage, childRefs, transitionDuration, activePage } = useFullpageContext()

  useEffect(() => {
    if (activePage === -1) {
      setActivePage(0)
      scrollTo(0)
    } else {
      scrollTo(activePage)
    }
  }, [activePage, childRefs, setActivePage])

  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

  const lockScroll = (lockTime: number) => {
    setIsScrollLocked(true)
    setTimeout(() => {
      setIsScrollLocked(false)
    }, lockTime)
  }

  const scrollTo = (page: number, duration: number = transitionDuration) => {
    if (isScrollLocked || childRefs.length <= 0) return
    lockScroll(duration)
    childRefs.forEach((childRef) => {
      if (childRef.current) {
        childRef.current.style.transition = `transform ${duration}ms ease-out`
        childRef.current.style.transform = `translateY(-${page * 100}vh)`
      }
    })
  }

  const handleScroll = useCallback(
    (event: WheelEvent | PointerEvent | KeyboardEvent) => {
      if (isScrollLocked) return

      let nextPage = activePage

      if (event instanceof WheelEvent) {
        nextPage = event.deltaY > 0 ? activePage + 1 : activePage - 1
      } else if (event instanceof PointerEvent) {
        if (event.type === 'pointerup' || event.type === 'pointercancel') {
          stopScroll.current = event.clientY
          const distance = Math.abs(stopScroll.current - startScroll.current)

          if (distance > thresholdPointer) {
            nextPage = stopScroll.current > startScroll.current ? activePage - 1 : activePage + 1
          }
        }
      } else if (event instanceof KeyboardEvent) {
        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
          nextPage = activePage + 1
        } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
          nextPage = activePage - 1
        }
      }

      nextPage = clamp(nextPage, 0, childRefs.length - 1)
      setActivePage(nextPage)
      scrollTo(nextPage)
    },
    [activePage, setActivePage, childRefs, isScrollLocked],
  )

  const isOverScrollable = (event: WheelEvent | PointerEvent) => {
    const focusedElement = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement
    if (focusedElement) {
      console.log(
        'TEST:',
        focusedElement.scrollHeight > focusedElement.clientHeight,
        focusedElement.style.overflowY === 'scroll' || focusedElement.style.overflowY === 'auto',
      )
      return (
        focusedElement.scrollHeight > focusedElement.clientHeight &&
        (focusedElement.style.overflowY === 'scroll' || focusedElement.style.overflowY === 'auto')
      )
    }
    console.log('TEST: false')
    return false
  }

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (isOverScrollable(event)) return

      if (Math.abs(event.deltaY) > thresholdWheel) {
        handleScroll(event)
      }
    }

    const handlePointer = (event: PointerEvent) => {
      if (!['pen', 'touch'].includes(event.pointerType)) return

      if (event.type === 'pointerdown' && !isOverScrollable(event)) {
        startScroll.current = event.clientY
        startTimestamp.current = event.timeStamp
        console.log('pointerdown', startScroll, stopScroll)
      } else if (['pointerup', 'pointercancel'].includes(event.type) && startScroll.current !== -1) {
        console.log(event.clientY)
        stopScroll.current = event.clientY
        const speed = Math.abs(stopScroll.current - startScroll.current) / (event.timeStamp - startTimestamp.current)

        if (speed > thresholdPointerSpeed) {
          handleScroll(event)
        }

        console.log('pointerup', startScroll.current, stopScroll.current)
        startScroll.current = -1
        stopScroll.current = -1
      }
    }

    const handleKey = (event: KeyboardEvent) => {
      if (isRelevantKeyEvent(event)) {
        handleScroll(event)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKey)
    window.addEventListener('pointerdown', handlePointer)
    window.addEventListener('pointerup', handlePointer)
    window.addEventListener('pointercancel', handlePointer)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('pointerdown', handlePointer)
      window.removeEventListener('pointerup', handlePointer)
      window.removeEventListener('pointercancel', handlePointer)
    }
  }, [handleScroll])
}
