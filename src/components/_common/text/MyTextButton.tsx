import { UnstyledButton, UnstyledButtonProps } from '@mantine/core'
import React from 'react'
import Span from './Span'

type Props = UnstyledButtonProps

const MyTextButton = React.forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    return (
      <UnstyledButton
        sx={{
          width: 'fit-content',
          textDecoration: 'underline',
          ...props.sx,
        }}
        {...props}
        ref={ref}
      >
        <Span>{props.children}</Span>
      </UnstyledButton>
    )
  }
)

export default MyTextButton
