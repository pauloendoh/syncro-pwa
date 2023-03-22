import { Box } from '@mantine/core'
import React from 'react'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import GlobalModals from '../modals/GlobalModals'
import MobileFooter from './MobileFooter/MobileFooter'
import MyNavbar from './MyNavbar/MyNavbar'

type Props = {
  children: React.ReactNode
  disableMarginTop?: boolean
  disableMarginBottom?: boolean
}

const LoggedLayout = (props: Props) => {
  const { isMobile: isXsScreen, isLoading } = useMyMediaQuery()
  return (
    <div>
      {!isXsScreen && !isLoading && <MyNavbar />}

      {props.disableMarginTop ? null : <Box mt={isXsScreen ? 24 : 96} />}

      {props.children}

      {props.disableMarginBottom ? null : <Box mt={96} />}

      {isXsScreen && !isLoading && <MobileFooter />}
      <GlobalModals />
    </div>
  )
}

export default LoggedLayout
