import { Tooltip } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { MdInstallMobile } from 'react-icons/md'

type UserChoice = Promise<{
  outcome: 'accepted' | 'dismissed'
  platform: string
}>

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: UserChoice
  prompt(): Promise<UserChoice>
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent

    transitionend: BeforeInstallPromptEvent
  }
}

const InstallPWAButton = () => {
  const [supportsPWA, setSupportsPWA] = useState(false)
  const [promptInstall, setPromptInstall] =
    useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      console.log('we are being triggered :D')
      setSupportsPWA(true)
      setPromptInstall(e)
    }
    window.addEventListener(
      'beforeinstallprompt',
      (e: BeforeInstallPromptEvent) => handler(e)
    )

    return () => window.removeEventListener('transitionend', handler)
  }, [])

  const onClick = (evt: React.MouseEvent) => {
    evt.preventDefault()
    if (!promptInstall) {
      return
    }
    promptInstall.prompt()
  }

  if (!supportsPWA) {
    return null
  }

  return (
    <Tooltip label="Install Syncro PWA">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <MdInstallMobile
          className="link-button"
          id="setup_button"
          title="Install app"
          onClick={onClick}
          fontSize={24}
        />
      </div>
    </Tooltip>
  )
}

export default InstallPWAButton
