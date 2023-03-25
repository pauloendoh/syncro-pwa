import {
  ActionIcon,
  Flex,
  Modal,
  NumberInput,
  Text,
  Textarea,
  useMantineTheme,
} from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { MdClose } from 'react-icons/md'
import { format } from 'timeago.js'
import useEditItemMutation from '../../../../hooks/react-query/syncro-item/useEditItemMutation'
import { useSyncroItemDetailsQuery } from '../../../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery'
import { useUserInfoQuery } from '../../../../hooks/react-query/user/useUserInfoQuery'
import { useMyRouterQuery } from '../../../../hooks/useMyRouterQuery'
import {
  useEditItemModal,
  useEditItemModalStore,
} from '../../../../hooks/zustand/modals/useEditItemModal'
import useRatingDetailsModalStore from '../../../../hooks/zustand/modals/useRatingDetailsModalStore'
import { RatingDto } from '../../../../types/domain/rating/RatingDto'
import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'
import { urls } from '../../../../utils/urls'
import { useAxios } from '../../../../utils/useAxios'
import HomeRatingItemButtons from '../../../HomePageContent/HomeRatingItem/HomeRatingItemButtons/HomeRatingItemButtons'
import FlexCol from '../../flex/FlexCol'
import FlexVCenter from '../../flex/FlexVCenter'
import SyncroItemImage from '../../image/SyncroItemImage/SyncroItemImage'
import UserImage from '../../image/SyncroItemImage/UserImage/UserImage'
import MyTextInput from '../../inputs/MyTextInput'
import SaveCancelButtons from '../../inputs/SaveCancelButtons'
import MyNextLink from '../../overrides/MyNextLink'

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
    >
      {initialItem && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FlexCol>
            <Flex gap={16}>
              <SyncroItemImage item={initialItem} height={120} width={120} />

              <FlexCol sx={{ flexGrow: 1 }} gap={8}>
                <MyTextInput
                  label="Title*"
                  {...register('title', {
                    required: 'Title is required',
                  })}
                  error={errors.title?.message}
                  width="100%"
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
              />
            </FlexVCenter>
          </FlexCol>
        </form>
      )}
    </Modal>
  )
}

export default EditItemModal
