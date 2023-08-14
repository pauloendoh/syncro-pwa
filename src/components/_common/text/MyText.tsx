import { Text, TextProps } from '@mantine/core'
import React from 'react'

type Props = TextProps & React.ComponentPropsWithoutRef<'span'>

const MyText = React.forwardRef<HTMLSpanElement, Props>((props, ref) => {
  return <Text {...props}>{props.children}</Text>
})

export default MyText
