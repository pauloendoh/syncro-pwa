import Link from 'next/link'
import React from 'react'

type Props = React.ComponentProps<typeof Link>

// override link with ref
const MyNextLink = React.forwardRef<HTMLAnchorElement, Props>((props, ref) => {
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

export default MyNextLink
