import { Box } from '@mantine/core'
import React from 'react'
import GlobalModals from '../modals/GlobalModals'
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

      <GlobalModals />
    </div>
  )
}

export default LoggedLayout
