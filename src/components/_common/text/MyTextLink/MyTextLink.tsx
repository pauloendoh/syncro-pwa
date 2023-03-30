import { Text, TextProps } from '@mantine/core'
import React from 'react'

type Props = TextProps & Omit<React.HTMLProps<HTMLSpanElement>, 'ref'>

const MyTextLink = React.forwardRef<HTMLSpanElement, Props>((props, ref) => {
  return (
    <Text
      component="span"
      ref={ref}
      underline
      color="primary"
      {...props}
      sx={{
        cursor: 'pointer',
        ...props.sx,
      }}
    />
  )
})

export default MyTextLink
