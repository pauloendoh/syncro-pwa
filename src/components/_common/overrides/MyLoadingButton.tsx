import { Button } from '@mantine/core'
import React from 'react'

import type { ButtonProps } from '@mantine/core'

type Props = ButtonProps &
  React.HTMLProps<HTMLButtonElement> & {
    width: number | string
    loading: boolean
  }

const MyLoadingButton = React.forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    return (
      <Button
        {...props}
        ref={ref}
        styles={{
          root: {
            width: props.width,
          },
          leftIcon: {
            marginRight: props.loading ? 0 : undefined,
          },
          ...props.styles,
        }}
      >
        {!props.loading && props.children}
      </Button>
    )
  }
)

export default MyLoadingButton
