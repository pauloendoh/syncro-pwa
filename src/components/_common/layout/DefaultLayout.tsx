import { AppShell, Box } from '@mantine/core'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import useCheckAuthCookieOrLogout from '../../../hooks/domains/auth/useCheckAuthCookieOrLogout'
import { useLogoutAndPushIndex } from '../../../hooks/domains/auth/useLogoutAndPushIndex'
import { useMessageRoomSockets } from '../../../hooks/socket/domain/message-room/useMessageRoomSockets'
import { useNewMessageSocket } from '../../../hooks/socket/domain/message-room/useNewMessageSocket/useNewMessageSocket'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import { useMyRouterQuery } from '../../../hooks/useMyRouterQuery'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import GlobalPhotoSlider from '../GlobalPhotoSlider/GlobalPhotoSlider'
import GlobalModals from '../modals/GlobalModals'
import MobileFooter from './MobileFooter/MobileFooter'
import MyNavbar from './MyNavbar/MyNavbar'
import MySidebar from './MySidebar/MySidebar'
import { useUserSockets } from './useUserSockets'

type Props = {
  children: React.ReactNode
  disableMarginTop?: boolean
  disableMarginBottom?: boolean
  mustBeLoggedIn?: boolean
  disableAppShell?: boolean
  horizontalScrollable?: boolean
  overrideMobileFooter?: React.ReactNode
}

const DefaultLayout = (props: Props) => {
  const { isMobile, isLoading: isLoadingMyMediaQuery } = useMyMediaQuery()
  const logoutAndPushIndex = useLogoutAndPushIndex()
  const { loadingCheckAuthCookie } = useCheckAuthCookieOrLogout()

  const router = useRouter()

  const isMessagePage = useMemo(() => {
    return router.asPath.includes('/messages')
  }, [router])

  const { roomId } = useMyRouterQuery()

  const { authUser } = useAuthStore()

  useMessageRoomSockets(roomId)
  useNewMessageSocket()
  useUserSockets()

  useEffect(() => {
    if (props.mustBeLoggedIn && !authUser && !loadingCheckAuthCookie) {
      logoutAndPushIndex()
    }
  }, [loadingCheckAuthCookie])

  if (props.disableAppShell) {
    return (
      <>
        {props.children}
        <GlobalModals />
      </>
    )
  }

  return (
    <AppShell
      navbar={<MySidebar />}
      styles={{
        main: {
          paddingInline: isMobile ? 0 : undefined,
          paddingTop: props.disableMarginTop ? 0 : undefined,
          overflowX: props.horizontalScrollable ? 'auto' : undefined,
        },
      }}
    >
      {!isMobile && !isLoadingMyMediaQuery && <MyNavbar />}

      {props.disableMarginTop ? null : <Box mt={isMobile ? 0 : 24} />}

      {props.children}

      {props.disableMarginBottom ? null : <Box mt={96} />}

      {isMobile &&
        !isLoadingMyMediaQuery &&
        !isMessagePage &&
        (props.overrideMobileFooter ?? <MobileFooter />)}
      <GlobalModals />
      <GlobalPhotoSlider />
    </AppShell>
  )
}

export default DefaultLayout
