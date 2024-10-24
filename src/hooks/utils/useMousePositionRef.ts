import { useEffect, useRef } from 'react'

// returns x and y from the document mousemove event, returns useRef values, instead of raw values;
export const useMousePositionRef = () => {
  const x = useRef(0)
  const y = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.current = e.clientX
      y.current = e.clientY
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return { x, y }
}
