import Image from 'next/image'
import React from 'react'

type Props = React.ComponentProps<typeof Image>

const MyNextImage300 = React.forwardRef<HTMLImageElement, Props>(
  (props, ref) => {
    return <Image ref={ref} {...props} width={300} height={300} />
  }
)

export default MyNextImage300
