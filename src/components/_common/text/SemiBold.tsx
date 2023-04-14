import { Text, TextProps } from '@mantine/core'
import React from 'react'

type Props = TextProps

const SemiBold = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <Text {...props} ref={ref} component="span" weight={500}>
      {props.children}
    </Text>
  )
})

export default SemiBold
