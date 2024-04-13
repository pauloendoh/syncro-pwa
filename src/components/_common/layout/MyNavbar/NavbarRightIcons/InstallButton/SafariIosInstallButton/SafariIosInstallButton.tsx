import { ActionIcon, Modal, Tooltip } from '@mantine/core'
import { useEffect, useState } from 'react'
import { MdInstallMobile } from 'react-icons/md'

type Props = {}

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
          <MdInstallMobile
            className="link-button"
            id="setup_button"
            title="Install app"
            fontSize={24}
          />
        </ActionIcon>
      </Tooltip>

      <Modal
        opened={isOpen}
        onClose={() => setIsOpen(false)}
        title="Install Syncro in iOS"
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
