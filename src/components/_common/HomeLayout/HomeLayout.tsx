import { Box, Flex } from '@mantine/core'
import React from 'react'
import useAuthStore from '../../../domains/auth/useAuthStore'

interface Props {
  children?: React.ReactNode
}

const HomeLayout = (props: Props) => {
  const authUser = useAuthStore((s) => s.authUser)

  if (!authUser) return null

  return (
    <div>
      {/* <Navbar /> */}

      <Flex>
        {/* <Sidebar /> */}

        <Box sx={{ mt: 10, flexGrow: 1 }}>{props.children}</Box>

        {/* <GlobalDialogs /> */}
      </Flex>
    </div>
  )
}

export default HomeLayout
