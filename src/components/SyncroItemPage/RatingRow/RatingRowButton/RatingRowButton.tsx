import { Button, ButtonProps } from '@mantine/core'
import React from 'react'

type Props = ButtonProps &
  // button element
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isActive?: boolean
    children: React.ReactNode
  }

const RatingRowButton = (props: Props) => {
  return (
    <Button
      size="sm"
      sx={{
        borderRadius: 8,
      }}
      color={props.isActive ? 'secondary' : 'dark'}
      {...props}
    >
      {props.children}
    </Button>
  )
}

export default RatingRowButton
