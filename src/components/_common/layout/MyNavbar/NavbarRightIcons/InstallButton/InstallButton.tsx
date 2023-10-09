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

  const currentPlatform = useMemo(() => {
    const isAndroid = /(android)/i.test(navigator.userAgent)

    // is android
    if (isAndroid) {
      return 'android'
    }

    const ios = ['iphone', 'ipad', 'ipod']
    if (ios.includes(navigator.platform.toLowerCase())) {
      return 'ios'
    }

    return 'none'
  }, [navigator.platform])

  if (authUser?.username === 'pauloendoh')
    return JSON.stringify({
      platform: currentPlatform,
      pwaIsInstalled,
      userAgent: navigator.userAgent,
    })
}

export default InstallButton
