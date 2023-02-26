import { Box } from '@mantine/core'
import React from 'react'
import MyNavbar from './MyNavbar/MyNavbar'

type Props = {
  children: React.ReactNode
  disableMarginTop?: boolean
  disableMarginBottom?: boolean
}

const LoggedLayout = (props: Props) => {
  return (
    <div>
      <MyNavbar />
      {props.disableMarginTop ? null : <Box mt={96} />}

      {props.children}

      {props.disableMarginBottom ? null : <Box mt={96} />}
    </div>
  )
}

export default LoggedLayout
