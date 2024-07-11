import React, { CSSProperties, useEffect, useState } from 'react'
import { Text } from '../Text'

type Props = {
  children: React.ReactNode
  maxLines?: number
  preventDefaultOnClick?: boolean
  onClick?: (isOpening: boolean) => void
  buttonsText?: {
    seeMore: string
    seeLess: string
  }
}

const MySeeMore = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showButton, setShowButton] = useState(false)

  const spanRef = React.useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (spanRef.current) {
      setShowButton(
        spanRef.current.scrollHeight !== spanRef.current.clientHeight
      )
    }
  }, [])

  const defaultStyles = isOpen
    ? undefined
    : ({
        WebkitLineClamp: props.maxLines ?? 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        display: '-webkit-box',
      } as CSSProperties)

  const seeMoreText = props.buttonsText?.seeMore ?? 'See more'
  const seeLessText = props.buttonsText?.seeLess ?? 'See less'

  return (
    <div
      ref={ref}
      style={{
        whiteSpace: 'pre-line',
      }}
    >
      <Text
        ref={spanRef}
        style={{
          marginBottom: 8,
          ...defaultStyles,
        }}
      >
        {props.children}
      </Text>
      {showButton && (
        <button
          onClick={(e) => {
            if (props.onClick) {
              props.onClick(!isOpen)
            }

            if (!props.preventDefaultOnClick) {
              e.preventDefault()
              setIsOpen(!isOpen)
            }
          }}
          style={{
            background: 'unset',
            border: 'unset',
            cursor: 'pointer',
            padding: 0,
            marginBottom: 8,
          }}
        >
          <Text weight={600}>{isOpen ? seeLessText : seeMoreText}</Text>
        </button>
      )}
    </div>
  )
})

export default MySeeMore
