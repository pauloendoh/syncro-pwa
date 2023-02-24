import { useMantineTheme } from '@mantine/core'
import Link from 'next/link'
import React from 'react'

// override link with ref
const NextLink = React.forwardRef<HTMLAnchorElement, any>((props, ref) => {
  const theme = useMantineTheme()
  return (
    <Link
      {...props}
      passHref
      style={{
        textDecoration: 'none',
        ...props.style,
      }}
    >
      {props.children}
    </Link>
  )
})

export default NextLink
