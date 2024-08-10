import { Text, TextProps } from '@mantine/core'
import React from 'react'
import { format } from 'timeago.js'

type Props = TextProps &
  React.ComponentPropsWithoutRef<'span'> & {
    date: string
  }

const MyTimeagoSpan = React.forwardRef<HTMLSpanElement, Props>((props, ref) => {
  return (
    <Text
      {...props}
      ref={ref}
      component="span"
      title={new Date(props.date).toLocaleString()}
    >
      {format(props.date)}
    </Text>
  )
})

export default MyTimeagoSpan
