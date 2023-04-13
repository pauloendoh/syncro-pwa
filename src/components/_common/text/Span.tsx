import { Text, TextProps } from '@mantine/core'
import React from 'react'

type Props = TextProps

const Span = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <Text {...props} ref={ref} component="span">
      {props.children}
    </Text>
  )
})

export default Span
