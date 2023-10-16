import { AppShell, Box } from '@mantine/core'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { useMessageRoomSockets } from '../../../hooks/socket/domain/message-room/useMessageRoomSockets'
import { useNewMessageSocket } from '../../../hooks/socket/domain/message-room/useNewMessageSocket/useNewMessageSocket'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import { useMyRouterQuery } from '../../../hooks/useMyRouterQuery'
import GlobalModals from '../modals/GlobalModals'
import MobileFooter from './MobileFooter/MobileFooter'
import MyNavbar from './MyNavbar/MyNavbar'
import MySidebar from './MySidebar/MySidebar'
import { useUserSockets } from './useUserSockets'

type Props = {
  children: React.ReactNode
  disableMarginTop?: boolean
  disableMarginBottom?: boolean
}

const LoggedLayout = (props: Props) => {
  const { isMobile, isLoading } = useMyMediaQuery()

  const router = useRouter()

  const isMessagePage = useMemo(() => {
    return router.asPath.includes('/messages')
  }, [router])

  const { roomId: roomId } = useMyRouterQuery()

  useMessageRoomSockets(roomId)
  useNewMessageSocket()
  useUserSockets()

  return (
    <AppShell
      navbar={<MySidebar />}
      styles={{
        main: {
          paddingInline: isMobile ? 0 : undefined,
          paddingTop: props.disableMarginTop ? 0 : undefined,
        },
      }}
    >
      {!isMobile && !isLoading && <MyNavbar />}

      {props.disableMarginTop ? null : <Box mt={isMobile ? 0 : 24} />}

      {props.children}

      {props.disableMarginBottom ? null : <Box mt={96} />}

      {isMobile && !isLoading && !isMessagePage && <MobileFooter />}
      <GlobalModals />
    </AppShell>
  )
}

export default LoggedLayout
