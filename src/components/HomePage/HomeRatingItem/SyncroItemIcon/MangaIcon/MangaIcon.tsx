import React from 'react'
import { IconBaseProps } from 'react-icons'

type Props = IconBaseProps

const MangaIcon = React.forwardRef<SVGSVGElement, Props>((props, ref) => {
  // https://thenounproject.com/search/icons/?q=manga
  return (
    <svg
      ref={ref}
      stroke="currentColor"
      fill={'currentColor'}
      strokeWidth="2"
      viewBox="0 0 1200 1200"
      height={props.size ?? '1rem'}
      width={props.size ?? '1rem'}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="m879 99.984h-558c-70.688 0-128.02 57.328-128.02 128.02v744c0 70.688 57.328 128.02 128.02 128.02h558c33.938 0 66.516-13.5 90.516-37.5s37.5-56.578 37.5-90.516v-744c0-70.688-57.328-128.02-128.02-128.02zm-270.52 243 41.531 123.52h-130.03c-15.094 0.32812-28.312 10.172-33 24.516l-39.984 123.52-105.52-78.047c-5.9531-4.2656-13.125-6.5625-20.484-6.4688-7.3594-0.14062-14.578 2.1094-20.484 6.4688l-37.5 27.516v-336c0-32.016 25.969-57.984 57.984-57.984h324.52l81 57.984-105.52 75.984c-12.562 8.6719-17.672 24.703-12.516 39z" />
    </svg>
  )
})

export default MangaIcon
