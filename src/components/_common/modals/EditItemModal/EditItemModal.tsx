import { Flex, Modal, NumberInput, Textarea } from '@mantine/core'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import useEditItemMutation from '../../../../hooks/react-query/syncro-item/useEditItemMutation'
import { useMyRouterQuery } from '../../../../hooks/useMyRouterQuery'
import { useEditItemModalStore } from '../../../../hooks/zustand/modals/useEditItemModal'
import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import ItemTypeSelector from '../../../ExplorePageContent/BrowseItemsExploreSection/ItemTypeSelector/ItemTypeSelector'
import FlexCol from '../../flex/FlexCol'
import FlexVCenter from '../../flex/FlexVCenter'
import MyTextInput from '../../inputs/MyTextInput'
import SaveCancelButtons from '../../inputs/SaveCancelButtons'
import EditItemImageSection from './EditItemImageSection/EditItemImageSection'
import ExternalUrlInput from './ExternalUrlInput/ExternalUrlInput'

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
    getValues,
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

  const hasTrailer = useMemo(() => {
    const validTypes: SyncroItemType[] = ['game', 'movie', 'tvSeries']
    return validTypes.includes(getValues('type'))
  }, [getValues('type')])

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
              <EditItemImageSection
                item={watch()}
                onChangeImage={(newImageSrc) => {
                  setValue('imageUrl', newImageSrc)
                }}
              />

              <FlexCol sx={{ flexGrow: 1 }} gap={8}>
                <Textarea
                  label="Title*"
                  {...register('title', {
                    required: 'Title is required',
                  })}
                  error={errors.title?.message}
                  autosize
                />

                <FlexVCenter gap={8}>
                  <ItemTypeSelector
                    required
                    onChange={(newItemType) => {
                      setValue('type', newItemType)
                    }}
                    value={watch('type')}
                    label="Type"
                    width={120}
                  />

                  <ExternalUrlInput
                    syncroItem={watch()}
                    onChange={(newSyncroItem) => {
                      reset(newSyncroItem)
                    }}
                  />
                </FlexVCenter>

                <NumberInput
                  label="Year"
                  value={watch('year') || 0}
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

            <FlexCol gap={8}>
              <Textarea
                {...register('plotSummary')}
                label="Plot summary"
                mt={16}
                autosize
                error={errors.plotSummary?.message}
              />

              {hasTrailer && (
                <MyTextInput
                  {...register('youtubeVideoUrl')}
                  label="Youtube trailer URL"
                />
              )}
            </FlexCol>

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
