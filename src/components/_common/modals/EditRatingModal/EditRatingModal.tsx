import {
  Button,
  Divider,
  Modal,
  Skeleton,
  Textarea,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useCallback, useEffect } from 'react'
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
import RatingSection from './RatingSection/RatingSection'
import RatingStatusSelector from './RatingStatusSelector/RatingStatusSelector'

const cn = (...classNames: string[]) => classNames.filter(Boolean).join(' ')

const EditRatingModal = () => {
  const {
    initialValue,
    closeModal,
    isOpen: modalIsOpen,
    openModal,
  } = useSaveRatingModalStore()

  const {
    closeModal: closeRatingDetailsModal,
    isOpen: ratingDetailsModalIsOpen,
  } = useRatingDetailsModalStore()

  const query = useMyRouterQuery()

  const { mutate: submitSaveRating, isLoading: isLoadingMutation } =
    useSaveRatingMutation()

  const onSubmit = async (data: RatingDto) => {
    submitSaveRating(data, {
      onSuccess: closeBothModals,
    })
  }

  const theme = useMantineTheme()

  const { data: syncroItem, isLoading: isLoadingItemInfo } =
    useSyncroItemDetailsQuery(initialValue?.syncroItemId)

  const form = useForm<RatingDto>({
    defaultValues: initialValue || buildRatingDto(),
  })

  useEffect(() => {
    if (modalIsOpen) {
      const newRating = buildRatingDto({
        syncroItemId: syncroItem?.id,
      })
      form.reset(initialValue || newRating)
    }
  }, [modalIsOpen])

  useEffect(() => {
    if (!query.saveRatingModal && modalIsOpen) {
      closeModal()
      return
    }
    if (query.saveRatingModal && !modalIsOpen) {
      const newRating = buildRatingDto({
        syncroItemId: syncroItem?.id,
      })
      openModal(initialValue || newRating)
    }
  }, [query.saveRatingModal])

  useConfirmTabClose(form.formState.isDirty && !!modalIsOpen)

  const handleCloseModal = useCallback(() => {
    if (form.formState.isDirty && !!modalIsOpen) {
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
  }, [form.formState.isDirty, !!modalIsOpen])

  const handleChangeRating = (newRating: number) => {
    if (newRating === form.watch('ratingValue')) {
      form.setValue('ratingValue', null, { shouldDirty: true })
      return
    }

    form.setValue('ratingValue', newRating, { shouldDirty: true })
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
      opened={!!modalIsOpen}
      onClose={handleCloseModal}
      title={
        <FlexVCenter justify="space-between">
          {isLoadingItemInfo ? (
            <Skeleton height={24} radius="md" />
          ) : (
            <Title order={4}>
              <Title order={4}>How would you rate "{syncroItem?.title}"?</Title>
            </Title>
          )}
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
        title: {
          width: '100%',
        },
        body: {
          maxHeight: 'calc(100vh - 200px)',
        },
      }}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FlexVCenter
          mt={24}
          sx={{
            justifyContent: 'center',
          }}
        >
          <RatingSection
            value={form.watch('ratingValue')}
            onChange={handleChangeRating}
          />
        </FlexVCenter>

        <FlexVCenter gap={16} mt={16}>
          <RatingStatusSelector
            value={form.watch('status')}
            onChange={(value) =>
              form.setValue('status', value, { shouldDirty: true })
            }
          />

          {syncroItem && form.watch('ratingProgress') && (
            <RatingProgressFields
              value={form.watch('ratingProgress')!}
              onChange={(value) =>
                form.setValue('ratingProgress', value, { shouldDirty: true })
              }
              item={syncroItem}
              status={form.watch('status')}
            />
          )}
        </FlexVCenter>

        <Textarea
          label="Review"
          value={form.watch('review')}
          onChange={(e) =>
            form.setValue('review', e.currentTarget.value, {
              shouldDirty: true,
            })
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
              if (initialValue) onSubmit(form.watch())
            }
          }}
        />
        <FlexVCenter mt={32} justify="space-between">
          <SaveCancelButtons
            isLoading={isLoadingMutation}
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
        form.watch('ratingValue') &&
        form.watch('ratingValue')! >= 8 && (
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
