import { Box } from '@mantine/core'
import React from 'react'
import useAuthStore from '../../../domains/auth/useAuthStore'
import { useLogout } from '../../../hooks/domains/auth/useLogout'
import MyNavbarHeader from './MyNavbarHeader/MyNavbarHeader'

type Props = {
  children: React.ReactNode
}

const LoggedLayout = (props: Props) => {
  const { authUser } = useAuthStore()

  const logout = useLogout()

  return (
    <div>
      <MyNavbarHeader />
      <Box mt={60} />
      {props.children}
    </div>
  )
}

export default LoggedLayout
