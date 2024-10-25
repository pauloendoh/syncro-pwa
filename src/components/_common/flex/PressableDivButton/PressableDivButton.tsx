import React from 'react'
import styles from './PressableDivButton.module.css'

type Props = React.ComponentProps<'button'>

export const PressableDivButton = React.forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    return (
      <button
        ref={ref}
        className={`${styles['pressable-div-like']} ${props.className ?? ''}`}
        {...props}
      />
    )
  }
)
