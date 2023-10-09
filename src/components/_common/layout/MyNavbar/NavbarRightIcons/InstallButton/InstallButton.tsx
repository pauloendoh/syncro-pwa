import { useMemo } from 'react'
import useAuthStore from '../../../../../../hooks/zustand/useAuthStore'

type Props = {}

const InstallButton = ({ ...props }: Props) => {
  const { authUser } = useAuthStore()
  const pwaIsInstalled = useMemo(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.matchMedia('(display-mode: standalone)').matches
  }, [])

  const platform = useMemo(() => {
    if (navigator.platform === 'Android') {
      return 'android'
    }

    if (
      navigator.platform === 'iPhone' ||
      navigator.platform === 'iPad' ||
      navigator.platform === 'iPod'
    ) {
      return 'ios'
    }

    return 'none'
  }, [navigator.platform])

  if (authUser?.username === 'pauloendoh') return platform
}

export default InstallButton
