import { Tooltip } from '@mantine/core'
import { useMemo } from 'react'
import { FaGooglePlay } from 'react-icons/fa'
import InstallPWAButton from './InstallPwaButton/InstallPwaButton'
import SafariIosInstallButton from './SafariIosInstallButton/SafariIosInstallButton'

type Props = {}

const InstallButton = ({ ...props }: Props) => {
  const pwaIsInstalled = useMemo(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.matchMedia('(display-mode: standalone)').matches
  }, [])

  const currentPlatform = useMemo(() => {
    return 'ios'
    // const platform = navigator.platform.toLowerCase()

    // const androidPlatforms = ['linux armv', 'linux aarch']
    // if (androidPlatforms.some((p) => platform.includes(p))) {
    //   return 'android'
    // }

    // const ios = ['iphone', 'ipad', 'ipod']
    // if (ios.includes(platform)) {
    //   return 'ios'
    // }

    // return 'none'
  }, [navigator.platform])

  const isSafariAndIos = useMemo(() => {
    return currentPlatform === 'ios' && navigator.userAgent.includes('Safari')
  }, [currentPlatform, navigator.userAgent])

  if (pwaIsInstalled) {
    return null
  }

  if (currentPlatform === 'android')
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

  if (isSafariAndIos) {
    return <SafariIosInstallButton />
  }

  return <InstallPWAButton />
}

export default InstallButton
