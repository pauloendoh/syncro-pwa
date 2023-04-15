import Image from 'next/image'
import React from 'react'

type Props = React.ComponentProps<typeof Image>

const MyNextImage300x400 = React.forwardRef<HTMLImageElement, Props>(
  (props, ref) => {
    return (
      <Image
        ref={ref}
        {...props}
        style={{
          width: props.width,
          height: props.height,

          ...props.style,
        }}
        width={300}
        height={400}
      />
    )
  }
)

export default MyNextImage300x400
