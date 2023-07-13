import {
  Button,
  Divider,
  Modal,
  Rating,
  Text,
  Textarea,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import useDeleteRatingMutation from '../../../../hooks/react-query/rating/useDeleteRatingMutation'
import useSaveRatingMutation from '../../../../hooks/react-query/rating/useSaveRatingMutation'
import { useSyncroItemDetailsQuery } from '../../../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery'
import useConfirmTabClose from '../../../../hooks/useConfirmTabClose'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import { useMyRouterQuery } from '../../../../hooks/useMyRouterQuery'
import useConfirmationModalStore from '../../../../hooks/zustand/modals/useConfirmationModalStore'
import useRatingDetailsModalStore from '../../../../hooks/zustand/modals/useRatingDetailsModalStore'
import useSaveRatingModalStore from '../../../../hooks/zustand/modals/useSaveRatingModalStore'
import {
  RatingDto,
  buildRatingDto,
} from '../../../../types/domain/rating/RatingDto'
import { zIndexes } from '../../../../utils/zIndexes'
import FlexCol from '../../flex/FlexCol'
import FlexVCenter from '../../flex/FlexVCenter'
import SaveCancelButtons from '../../inputs/SaveCancelButtons'
import RecommendItemToUsersList from '../RecommendItemModal/RecommendItemToUsersList/RecommendItemToUsersList'
import RatingProgressFields from './RatingProgressFields/RatingProgressFields'
import RatingStatusSelector from './RatingStatusSelector/RatingStatusSelector'
import { getLabelByRatingValue } from './getLabelByRatingValue/getLabelByRatingValue'

const cn = (...classNames: string[]) => classNames.filter(Boolean).join(' ')

const EditRatingModal = () => {
  const { initialValue, closeModal } = useSaveRatingModalStore()

  const {
    closeModal: closeRatingDetailsModal,
    isOpen: ratingDetailsModalIsOpen,
  } = useRatingDetailsModalStore()
  const { saveRatingModal: editRatingModal } = useMyRouterQuery()

  const modalIsOpen = useMemo(() => !!editRatingModal, [editRatingModal])

  const { mutate: submitSaveRating, isLoading } = useSaveRatingMutation()

  const onSubmit = async (data: RatingDto) => {
    submitSaveRating(data, {
      onSuccess: closeBothModals,
    })
  }

  const theme = useMantineTheme()

  const { data: syncroItem } = useSyncroItemDetailsQuery(
    initialValue?.syncroItemId
  )

  const {
    reset,
    watch,
    getValues,
    register,
    handleSubmit,
    setValue,
    formState: { isDirty },
  } = useForm<RatingDto>({
    defaultValues: initialValue || buildRatingDto(),
  })

  useEffect(() => {
    if (!!modalIsOpen) {
      reset(
        initialValue ||
          buildRatingDto({
            syncroItemId: syncroItem?.id,
          })
      )
    }
  }, [modalIsOpen])

  useConfirmTabClose(isDirty && !!modalIsOpen)

  const handleCloseModal = useCallback(() => {
    if (isDirty && !!modalIsOpen) {
      openConfirmDialog({
        title: 'Unsaved changes',
        description:
          'Are you sure you want to close this modal? Your changes will not be saved.',
        onConfirm: () => {
          closeModal()
        },
      })
      return
    }

    closeModal()
  }, [isDirty, !!modalIsOpen])

  const handleChangeRating = (newRating: number) => {
    if (newRating === watch('ratingValue')) {
      setValue('ratingValue', null, { shouldDirty: true })
      return
    }

    setValue('ratingValue', newRating, { shouldDirty: true })
  }

  const closeBothModals = () => {
    closeModal()
    if (ratingDetailsModalIsOpen()) {
      closeRatingDetailsModal()
    }
  }

  const { mutate: submitDeleteRating } = useDeleteRatingMutation()
  const { openConfirmDialog } = useConfirmationModalStore()
  const handleDelete = () => {
    if (initialValue) {
      openConfirmDialog({
        title: 'Delete rating',
        description: 'Are you sure you want to delete this rating?',
        onConfirm: () => {
          submitDeleteRating(initialValue.id, {
            onSuccess: closeBothModals,
          })
        },
      })
    }
  }

  const { isMobile } = useMyMediaQuery()

  return (
    <Modal
      opened={!!editRatingModal}
      onClose={handleCloseModal}
      title={
        <FlexVCenter justify="space-between">
          <Title order={4}>How would you rate "{syncroItem?.title}"?</Title>
        </FlexVCenter>
      }
      withCloseButton={false}
      styles={{
        overlay: {
          zIndex: zIndexes.editRatingModal,
        },
        inner: {
          zIndex: zIndexes.editRatingModal,
        },
        header: {
          zIndex: zIndexes.editRatingModalHeader,
          background: theme.colors.dark[7],
        },
        body: {
          maxHeight: 'calc(100vh - 200px)',
        },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexVCenter
          mt={24}
          sx={{
            justifyContent: 'center',
          }}
        >
          <Rating
            value={watch('ratingValue') || undefined}
            onChange={handleChangeRating}
            color={watch('ratingValue') === null ? '#343a40' : 'secondary'}
            size={isMobile ? 'lg' : 'xl'}
            count={10}
          />
        </FlexVCenter>

        <FlexVCenter
          justify={'center'}
          mt={8}
          sx={{
            height: 24,
          }}
        >
          {!!watch('ratingValue') && (
            <Text
              sx={{
                fontWeight: 500,
                color: theme.colors.yellow[5],
              }}
            >
              {getLabelByRatingValue(watch('ratingValue'))}
            </Text>
          )}
        </FlexVCenter>

        <FlexVCenter gap={16} mt={24}>
          <RatingStatusSelector
            value={watch('status')}
            onChange={(value) =>
              setValue('status', value, { shouldDirty: true })
            }
          />

          {syncroItem && watch('ratingProgress') && (
            <RatingProgressFields
              value={watch('ratingProgress')!}
              onChange={(value) =>
                setValue('ratingProgress', value, { shouldDirty: true })
              }
              item={syncroItem}
              status={watch('status')}
            />
          )}
        </FlexVCenter>

        <Textarea
          label="Review"
          value={watch('review')}
          onChange={(e) =>
            setValue('review', e.currentTarget.value, { shouldDirty: true })
          }
          placeholder="Write a review..."
          autosize
          minRows={3}
          styles={{
            root: {
              marginTop: 20,
            },
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
              if (initialValue) onSubmit(watch())
            }
          }}
        />
        <FlexVCenter mt={32} justify="space-between">
          <SaveCancelButtons
            isLoading={isLoading}
            onCancel={handleCloseModal}
          />
          {!!initialValue?.id && (
            <Button onClick={handleDelete} color="red" variant="outline">
              Delete
            </Button>
          )}
        </FlexVCenter>
      </form>

      {initialValue?.syncroItemId &&
        watch('ratingValue') &&
        watch('ratingValue')! >= 8 && (
          <FlexCol mt={40} gap={16} pb={16}>
            <Divider />
            <Title order={4}>Recommend to users</Title>

            <RecommendItemToUsersList itemId={initialValue.syncroItemId} />
          </FlexCol>
        )}
    </Modal>
  )
}

export default EditRatingModal
