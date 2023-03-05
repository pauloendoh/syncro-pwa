import { Box, Modal, Select, Title } from '@mantine/core'
import { useEffect, useMemo, useRef } from 'react'
import { useSavedItemsQuery } from '../../../../hooks/react-query/interest/useSavedItemsQuery'
import useUpdateSavedPositionMutation from '../../../../hooks/react-query/interest/useUpdateSavedPositionMutation'
import { useSyncroItemDetailsQuery } from '../../../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery'
import useLoadingModalStore from '../../../../hooks/zustand/modals/useLoadingModalStore'
import { InterestDto } from '../../../../types/domain/interest/InterestDto'

type Props = {
  isOpen: boolean
  initialValue: InterestDto | null
  onClose: () => void
}

const SavedPositionModal = (props: Props) => {
  const { data: syncroItem } = useSyncroItemDetailsQuery(
    props.initialValue?.syncroItemId
  )

  const { data: savedItems } = useSavedItemsQuery()

  const positionOptions = useMemo(() => {
    if (!savedItems) return []
    const itemsSameType = savedItems.filter(
      (item) => item.syncroItem?.type === syncroItem?.type
    )

    return itemsSameType.map((item) => item.position)
  }, [syncroItem, savedItems])

  const { mutate: submitUpdatePosition } = useUpdateSavedPositionMutation()

  const { openModal: openLoadingModal, closeModal: closeLoadingModal } =
    useLoadingModalStore()
  const handlePressNewPosition = (newPosition: number) => {
    if (!props.initialValue) return

    openLoadingModal()
    submitUpdatePosition(
      {
        interestId: props.initialValue.id,
        newPosition,
      },
      {
        onSuccess: () => {
          props.onClose()
        },
        onSettled: () => {
          closeLoadingModal()
        },
      }
    )
  }

  const selectOptions = useMemo(() => {
    return positionOptions.map((p) => ({
      value: p.toString(),
      label: p.toString(),
    }))
  }, [positionOptions])

  const selectRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (props.isOpen) {
      setTimeout(() => {
        selectRef.current?.focus()
      }, 100)
    }
  }, [props.isOpen])

  return (
    <Modal
      opened={props.isOpen}
      onClose={props.onClose}
      size="xs"
      title={<Title order={4}>Change saved position</Title>}
    >
      <Box w={80}>
        <Select
          label="Position"
          data={selectOptions}
          value={props.initialValue?.position?.toString() || ''}
          onChange={(value) => handlePressNewPosition(Number(value))}
        />
      </Box>
    </Modal>
  )
}

export default SavedPositionModal
