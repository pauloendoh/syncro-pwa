import { Text, TextProps } from '@mantine/core'
import React from 'react'

type Props = TextProps & React.ComponentPropsWithoutRef<'span'>

const MySpan = React.forwardRef<HTMLSpanElement, Props>((props, ref) => {
  return (
    <Text {...props} ref={ref} component="span">
      {props.children}
    </Text>
  )
})

export default MySpan
