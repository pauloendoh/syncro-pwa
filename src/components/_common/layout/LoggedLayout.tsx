import { Box } from '@mantine/core'
import React from 'react'
import MyNavbarHeader from './MyNavbarHeader/MyNavbarHeader'

type Props = {
  children: React.ReactNode
  disableMarginTop?: boolean
}

const LoggedLayout = (props: Props) => {
  return (
    <div>
      <MyNavbarHeader />
      {props.disableMarginTop ? null : <Box mt={96} />}

      {props.children}
    </div>
  )
}

export default LoggedLayout
