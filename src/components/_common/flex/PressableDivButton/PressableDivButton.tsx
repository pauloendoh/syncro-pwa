import React from 'react'
import { cls } from '../../../../utils/cls'
import styles from './PressableDivButton.module.scss'

type Props = React.ComponentProps<'button'>

export const PressableDivButton = React.forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    return (
      <button
        ref={ref}
        className={cls(styles.pressableDivLike, props.className)}
        {...props}
      />
    )
  }
)
