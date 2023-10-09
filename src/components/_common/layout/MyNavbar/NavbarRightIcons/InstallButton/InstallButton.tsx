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
    const platform = navigator.platform.toLowerCase()

    const androidPlatforms = ['linux armv', 'linux aarch']
    if (androidPlatforms.some((p) => platform.includes(p))) {
      return 'android'
    }

    const ios = ['iphone', 'ipad', 'ipod']
    if (ios.includes(platform)) {
      return 'ios'
    }

    return 'none'
  }, [navigator.platform])

  if (authUser?.username === 'pauloendoh')
    return JSON.stringify({
      platform: navigator.platform,
      pwaIsInstalled,
      currentPlatform,
    })
}

export default InstallButton
