import { Box } from '@mantine/core'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { useMessageRoomSockets } from '../../../hooks/socket/domain/message-room/useMessageRoomSockets'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import { useMyRouterQuery } from '../../../hooks/useMyRouterQuery'
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

  const { roomId: roomId } = useMyRouterQuery()

  useMessageRoomSockets(roomId)

  return (
    <div>
      {!isXsScreen && !isLoading && <MyNavbar />}

      {props.disableMarginTop ? null : <Box mt={isXsScreen ? 24 : 96} />}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
      >
        {props.children}
      </motion.div>

      {props.disableMarginBottom ? null : <Box mt={96} />}

      {isXsScreen && !isLoading && !isMessagePage && <MobileFooter />}
      <GlobalModals />
    </div>
  )
}

export default LoggedLayout
