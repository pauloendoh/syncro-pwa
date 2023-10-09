import { Tooltip } from '@mantine/core'
import { useMemo } from 'react'
import { FaGooglePlay } from 'react-icons/fa'

type Props = {}

const InstallButton = ({ ...props }: Props) => {
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

  if (pwaIsInstalled) {
    return null
  }

  if (platform === 'ios') {
    return null
  }

  if (platform === 'android')
    return (
      <Tooltip label="Install Syncro from Google Play">
        <a
          href="https://play.google.com/store/apps/details?id=app.vercel.syncro.twa"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'unset',
          }}
        >
          <FaGooglePlay />
        </a>
      </Tooltip>
    )
}

export default InstallButton
