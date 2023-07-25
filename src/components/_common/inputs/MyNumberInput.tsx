import { NumberInput } from '@mantine/core'
import React from 'react'

type Props = Omit<
  React.ComponentProps<typeof NumberInput>,
  'value' | 'onChange'
> & {
  precision: number
  value: number | undefined
  onChange: (value: number) => void
}

const MyNumberInput = React.forwardRef<HTMLInputElement, Props>(
  ({ ...props }, ref) => {
    return (
      <NumberInput
        autoComplete="off"
        stepHoldDelay={500}
        stepHoldInterval={100}
        removeTrailingZeros
        ref={ref}
        {...props}
        precision={props.precision}
        value={Number(props.value)}
        onChange={(val) => {
          if (val === '') {
            props.onChange(0)
            return
          }
          props.onChange(val)
        }}
      />
    )
  }
)

export default MyNumberInput
