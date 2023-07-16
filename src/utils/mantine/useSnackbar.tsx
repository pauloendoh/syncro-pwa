import { NotificationProps } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { ReactNode } from 'react'
import { MdCheck, MdError } from 'react-icons/md'
import { useMyMediaQuery } from '../../hooks/useMyMediaQuery'

export function useSnackbar() {
  const { isMobile } = useMyMediaQuery()

  return {
    success: (title: ReactNode, options?: NotificationProps) => {
      showNotification({
        title,
        message: '',
        icon: <MdCheck />,
        color: 'teal',
        ...options,
      })
    },
    error: (title: string, options?: NotificationProps) => {
      showNotification({
        title,
        message: '',
        icon: <MdError />,
        color: 'red',
        ...options,
      })
    },
  }
}
