import { ActionIcon, Modal, Tooltip } from '@mantine/core'
import { useEffect, useState } from 'react'
import { FaApple } from 'react-icons/fa'
import { MdInstallMobile } from 'react-icons/md'

type Props = {
  iconType?: 'phone' | 'ios'
  fontSize?: number | string
}

const SafariIosInstallButton = ({ ...props }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const [hasOpenOnce, setHasOpenOnce] = useState(false)
  useEffect(() => {
    if (isOpen) {
      setHasOpenOnce(true)
    }
  }, [isOpen])

  return (
    <>
      <Tooltip label="Install Syncro PWA">
        <ActionIcon
          onClick={() => {
            setIsOpen(true)
          }}
        >
          {props.iconType === 'phone' && (
            <MdInstallMobile fontSize={props.fontSize ?? 24} />
          )}
          {props.iconType === 'ios' && (
            <FaApple fontSize={props.fontSize ?? 24} />
          )}
        </ActionIcon>
      </Tooltip>

      <Modal
        opened={isOpen}
        onClose={() => setIsOpen(false)}
        title="How to install Syncro in iOS"
      >
        {hasOpenOnce && (
          <div>
            <video
              controls
              muted
              style={{
                width: '100%',
                height: 'auto',
              }}
            >
              <source src="/videos/safari_ios_install.mp4" type="video/mp4" />
            </video>
          </div>
        )}
      </Modal>
    </>
  )
}

export default SafariIosInstallButton
