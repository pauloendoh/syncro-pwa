import { Button } from '@mantine/core'
import React from 'react'
import useAuthStore from '../../../domains/auth/useAuthStore'
import { useLogout } from '../../../hooks/domains/auth/useLogout'

type Props = {
  children: React.ReactNode
}

const LoggedLayout = (props: Props) => {
  const { authUser } = useAuthStore()

  const logout = useLogout()

  return (
    <div>
      hello {authUser?.username}
      <div>
        <Button onClick={logout}>Logout</Button>
      </div>
      {props.children}
    </div>
  )
}

export default LoggedLayout
