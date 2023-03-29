import { Flex, Modal, NumberInput, Textarea } from '@mantine/core'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useEditItemMutation from '../../../../hooks/react-query/syncro-item/useEditItemMutation'
import { useMyRouterQuery } from '../../../../hooks/useMyRouterQuery'
import { useEditItemModalStore } from '../../../../hooks/zustand/modals/useEditItemModal'
import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'
import FlexCol from '../../flex/FlexCol'
import FlexVCenter from '../../flex/FlexVCenter'
import SyncroItemImage from '../../image/SyncroItemImage/SyncroItemImage'
import SaveCancelButtons from '../../inputs/SaveCancelButtons'

const EditItemModal = () => {
  const { initialValue: initialItem, closeModal } = useEditItemModalStore()

  const { editingItem } = useMyRouterQuery()

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SyncroItemDto>({})

  useEffect(() => {
    if (editingItem && initialItem) {
      reset(initialItem)
    }
  }, [editingItem])

  const { mutate: submitEdit, isLoading } = useEditItemMutation()

  const onSubmit = (data: SyncroItemDto) => {
    submitEdit(data, {
      onSuccess: () => {
        closeModal()
      },
    })
  }

  return (
    <Modal
      opened={!!editingItem}
      onClose={closeModal}
      title={`Edit item - ${initialItem?.id}`}
      size="lg"
    >
      {initialItem && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FlexCol>
            <Flex gap={16}>
              <SyncroItemImage item={initialItem} height={120} width={120} />

              <FlexCol sx={{ flexGrow: 1 }} gap={8}>
                <Textarea
                  label="Title*"
                  {...register('title', {
                    required: 'Title is required',
                  })}
                  error={errors.title?.message}
                  autosize
                />

                <NumberInput
                  label="Year"
                  value={watch('year')}
                  onChange={(value) => {
                    setValue('year', value || 1900)
                  }}
                  error={errors.year?.message}
                  styles={{
                    root: {
                      width: 100,
                    },
                  }}
                />
              </FlexCol>
            </Flex>

            <Textarea
              mt={16}
              autosize
              minRows={3}
              maxRows={10}
              label="Plot summary"
              {...register('plotSummary')}
              error={errors.plotSummary?.message}
            />

            <FlexVCenter mt={40}>
              <SaveCancelButtons
                isLoading={isLoading}
                onEnabledAndCtrlEnter={() => onSubmit(watch())}
                onCancel={closeModal}
              />
            </FlexVCenter>
          </FlexCol>
        </form>
      )}
    </Modal>
  )
}

export default EditItemModal
