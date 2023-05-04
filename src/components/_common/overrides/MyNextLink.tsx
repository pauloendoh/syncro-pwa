import { nprogress } from '@mantine/nprogress'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

type Props = React.ComponentProps<typeof Link>

// override link with ref
const MyNextLink = React.forwardRef<HTMLAnchorElement, Props>((props, ref) => {
  const router = useRouter()

  return (
    <Link
      {...props}
      passHref
      style={{
        textDecoration: 'none',
        color: 'inherit',
        width: 'fit-content',

        ...props.style,
      }}
      onClick={(e) => {
        if (router.asPath !== props.href) {
          nprogress.start()
        }

        if (props.onClick) {
          props.onClick(e)
        }
      }}
    >
      {props.children}
    </Link>
  )
})

export default MyNextLink
