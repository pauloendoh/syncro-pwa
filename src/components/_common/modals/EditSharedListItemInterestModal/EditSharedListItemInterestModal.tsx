import { Button, Modal, Radio, ScrollArea, Text, Title } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useSaveSharedListItemInterestMutation } from '../../../../hooks/react-query/shared-list/useSaveSharedListItemInterestMutation'
import { useDeleteSharedListItemInterestMutation } from '../../../../hooks/react-query/shared-list/useSaveSharedListItemInterestMutation copy'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import { useModalZIndex } from '../../../../hooks/utils/useModalZIndex'
import useConfirmationModalStore from '../../../../hooks/zustand/modals/useConfirmationModalStore'
import { useEditSharedListItemInterestModalStore } from '../../../../hooks/zustand/modals/useEditSharedListItemInterestModalStore '
import FlexCol from '../../flex/FlexCol'
import FlexVCenter from '../../flex/FlexVCenter'
import SaveCancelButtons from '../../inputs/SaveCancelButtons'

export const EditSharedListItemInterestModal = () => {
  const { isOpen, closeModal, initialValues } =
    useEditSharedListItemInterestModalStore()

  const zIndex = useModalZIndex({ isOpen })

  const { isMobile } = useMyMediaQuery()

  const typeMap = useSyncroItemTypeMap({
    itemType: initialValues?.syncroItem.type,
  })

  const [interestValue, setInterestValue] = useState('5')
  useEffect(() => {
    if (isOpen) {
      setInterestValue(
        initialValues?.previousInterest?.interest.toString() ?? ''
      )
    }
  }, [isOpen])

  const { mutate: submitSave } = useSaveSharedListItemInterestMutation()

  const { mutate: submitDelete } = useDeleteSharedListItemInterestMutation()

  const { openConfirmDialog } = useConfirmationModalStore()

  return (
    <Modal
      size="sm"
      opened={isOpen}
      onClose={closeModal}
      withCloseButton={false}
      title={
        <FlexCol gap={4}>
          <Title order={4}>
            How interested are you in {typeMap.getVerb()}ing{' '}
            {initialValues?.syncroItem.title}?
          </Title>
          <Text opacity={0.75} size="sm">
            In shared list "{initialValues?.sharedList.title}"
          </Text>
        </FlexCol>
      }
      styles={{
        overlay: {
          zIndex,
        },
        inner: {
          zIndex,
        },
      }}
      scrollAreaComponent={isMobile ? undefined : ScrollArea.Autosize}
    >
      <FlexCol gap={32}>
        <Radio.Group
          name="interest"
          value={interestValue}
          onChange={(val) => setInterestValue(val)}
        >
          <FlexCol gap={16}>
            <Radio value="5" label="5 - Extremely interested" />
            <Radio value="4" label="4 - Very interested" />
            <Radio value="3" label="3 - Kinda interested" />
            <Radio value="2" label="2 - Not very interested" />
            <Radio value="1" label="1 - Not interested at all" />
          </FlexCol>
        </Radio.Group>

        <FlexVCenter justify={'space-between'}>
          <SaveCancelButtons
            disabled={interestValue === ''}
            onSave={() => {
              if (initialValues) {
                submitSave(
                  {
                    interest: parseInt(interestValue),
                    sharedListId: initialValues?.sharedList.id,
                    syncroItemId: initialValues?.syncroItem.id,
                  },
                  {
                    onSuccess: () => {
                      closeModal()
                    },
                  }
                )
              }
            }}
            onCancel={closeModal}
          />

          {!!initialValues?.previousInterest?.id && (
            <Button
              variant="subtle"
              color="red"
              onClick={() => {
                openConfirmDialog({
                  title: 'Remove interest',
                  description:
                    'Are you sure you want to remove your interest in this item?',
                  onConfirm: () => {
                    if (initialValues?.previousInterest?.id) {
                      submitDelete({
                        interestId: initialValues.previousInterest?.id,
                      })
                      closeModal()
                    }
                  },
                })
              }}
            >
              Remove
            </Button>
          )}
        </FlexVCenter>
      </FlexCol>
    </Modal>
  )
}
