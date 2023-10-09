import { Tooltip } from '@mantine/core'
import { useMemo } from 'react'
import { FaGooglePlay } from 'react-icons/fa'
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

  return (
    <Tooltip label="Install Syncro from Google Play">
      <a
        href="https://play.google.com/store/apps/details?id=app.vercel.syncro.twa"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: 'unset',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <FaGooglePlay />
      </a>
    </Tooltip>
  )
}

export default InstallButton
