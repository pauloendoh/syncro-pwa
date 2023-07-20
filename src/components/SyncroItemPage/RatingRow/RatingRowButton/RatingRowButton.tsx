import { Button, ButtonProps } from '@mantine/core'
import React from 'react'

type Props = ButtonProps &
  // button element
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isActive?: boolean
    children: React.ReactNode
  }

const RatingRowButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ isActive, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size="sm"
        sx={{
          borderRadius: 8,
        }}
        color={isActive ? 'secondary' : 'dark'}
        {...props}
      >
        {props.children}
      </Button>
    )
  }
)

export default RatingRowButton
