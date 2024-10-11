import { Box, Modal, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useSettingsQuery } from '../../../../hooks/react-query/user-settings/useSettingsQuery'
import useUpdateSettingsMutation from '../../../../hooks/react-query/user-settings/useUpdateSettingsMutation'
import { useModalZIndex } from '../../../../hooks/utils/useModalZIndex'
import useMinRatingSharingModalStore from '../../../../hooks/zustand/modals/useMinRatingSharingModalStore'
import MyNumberInput from '../../inputs/MyNumberInput'
import SaveCancelButtons from '../../inputs/SaveCancelButtons'

const MinRatingSharingModal = () => {
  const { closeModal, isOpen: modalIsOpen } = useMinRatingSharingModalStore()

  const zIndex = useModalZIndex({
    isOpen: !!modalIsOpen,
  })

  const { data: userSettings } = useSettingsQuery()
  const [minRating, setMinRating] = useState<number | null>(null)

  useEffect(() => {
    if (userSettings) {
      setMinRating(userSettings?.minRatingForSharing)
    }
  }, [userSettings?.minRatingForSharing])

  const { mutate: submitUpdate } = useUpdateSettingsMutation()

  return (
    <Modal
      opened={!!modalIsOpen}
      onClose={closeModal}
      title={'Minimum rating for sharing'}
      size="xs"
      styles={{
        overlay: {
          zIndex,
        },
        inner: {
          zIndex,
        },
      }}
    >
      <Text size="sm">Share the things you love. That’s our goal.</Text>
      <Text size="sm">
        A sharing pop-up will open after you give a high enough rating.
      </Text>

      <MyNumberInput
        onChange={(value) => {
          setMinRating(value)
        }}
        value={minRating}
        precision={1}
        sx={{
          width: 120,
          marginTop: 16,
        }}
        min={0}
        max={10}
        label="Minimum rating"
      />

      {!minRating && (
        <Text mt={8} size="sm" color="red">
          Pop-up won't appear after rating. You can change this later in your
          settings page.
        </Text>
      )}

      <Box mt={16} />
      <SaveCancelButtons
        onSave={() => {
          submitUpdate(
            {
              ...userSettings!,
              minRatingForSharing: minRating,
            },
            {
              onSuccess: () => {
                closeModal()
              },
            }
          )
        }}
        onCancel={closeModal}
      />
    </Modal>
  )
}

export default MinRatingSharingModal
