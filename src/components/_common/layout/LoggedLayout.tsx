import { Box } from '@mantine/core'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
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

  const router = useRouter()

  const isMessagePage = useMemo(() => {
    return router.asPath.includes('/messages')
  }, [router])

  return (
    <div>
      {!isXsScreen && !isLoading && <MyNavbar />}

      {props.disableMarginTop ? null : <Box mt={isXsScreen ? 24 : 96} />}

      {props.children}

      {props.disableMarginBottom ? null : <Box mt={96} />}

      {isXsScreen && !isLoading && !isMessagePage && <MobileFooter />}
      <GlobalModals />
    </div>
  )
}

export default LoggedLayout
