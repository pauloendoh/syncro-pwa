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
import { useEffect, useMemo, useState } from 'react'
import useDeleteRatingMutation from '../../../../hooks/react-query/rating/useDeleteRatingMutation'
import useSaveRatingMutation from '../../../../hooks/react-query/rating/useSaveRatingMutation'
import { useSyncroItemDetailsQuery } from '../../../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import { useMyRouterQuery } from '../../../../hooks/useMyRouterQuery'
import useConfirmationModalStore from '../../../../hooks/zustand/modals/useConfirmationModalStore'
import useRatingDetailsModalStore from '../../../../hooks/zustand/modals/useRatingDetailsModalStore'
import useSaveRatingModalStore from '../../../../hooks/zustand/modals/useSaveRatingModalStore'
import { RatingDto } from '../../../../types/domain/rating/RatingDto'
import { RatingStatusType } from '../../../../types/domain/rating/ratingStatus'
import { zIndexes } from '../../../../utils/zIndexes'
import FlexCol from '../../flex/FlexCol'
import FlexVCenter from '../../flex/FlexVCenter'
import SaveCancelButtons from '../../inputs/SaveCancelButtons'
import RecommendItemToUsersList from '../RecommendItemActionSheet/RecommendItemToUsersList/RecommendItemToUsersList'
import RatingStatusSelector from './RatingStatusSelector/RatingStatusSelector'
import { getLabelByRatingValue } from './getLabelByRatingValue/getLabelByRatingValue'

const EditRatingModal = () => {
  const { initialValue, closeModal } = useSaveRatingModalStore()
  const {
    closeModal: closeRatingDetailsModal,
    isOpen: ratingDetailsModalIsOpen,
  } = useRatingDetailsModalStore()
  const { saveRatingModal } = useMyRouterQuery()

  const { mutate: submitSaveRating, isLoading } = useSaveRatingMutation()
  // const { mutate: mutateDeleteTag } = useDeleteTagMutation()

  const onSubmit = async (data: RatingDto) => {
    submitSaveRating(data, {
      onSuccess: closeBothModals,
    })
  }

  const theme = useMantineTheme()

  const { data: syncroItem } = useSyncroItemDetailsQuery(
    initialValue?.syncroItemId
  )

  // PE 1/3 - useForm

  const [status, setStatus] = useState<RatingStatusType>('COMPLETED')
  const [rating, setRating] = useState<number | null>(null)
  const [reviewText, setReviewText] = useState('')

  useEffect(() => {
    setRating(initialValue?.ratingValue || null)
    setReviewText(initialValue?.review || '')
    setStatus(initialValue?.status || 'COMPLETED')
  }, [initialValue])

  const handleChangeRating = (newRating: number) => {
    if (newRating === rating) {
      setRating(null)
      return
    }

    setRating(newRating)
  }

  const isDisabled = useMemo(
    () => !initialValue?.id && rating === null,
    [initialValue?.id, rating]
  )

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
      opened={!!saveRatingModal}
      onClose={closeModal}
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
      <FlexVCenter
        mt={24}
        sx={{
          justifyContent: 'center',
        }}
      >
        <Rating
          value={rating || 0}
          onChange={handleChangeRating}
          color={'secondary'}
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
        {!!rating && (
          <Text
            sx={{
              fontWeight: 500,
              color: theme.colors.yellow[5],
            }}
          >
            {getLabelByRatingValue(rating)}
          </Text>
        )}
      </FlexVCenter>

      <RatingStatusSelector value={status} onChange={setStatus} />

      <Textarea
        label="Review"
        value={reviewText}
        onChange={(e) => setReviewText(e.currentTarget.value)}
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
            if (initialValue)
              onSubmit({
                ...initialValue,
                ratingValue: rating,
                review: reviewText,
                status,
              })
          }
        }}
      />
      <FlexVCenter mt={32} justify="space-between">
        <SaveCancelButtons
          isLoading={isLoading}
          disabled={isDisabled}
          onSave={() => {
            if (initialValue)
              onSubmit({
                ...initialValue,
                ratingValue: rating,
                review: reviewText,
                status,
              })
          }}
          onCancel={closeModal}
        />
        {!!initialValue?.id && (
          <Button onClick={handleDelete} color="red" variant="outline">
            Delete
          </Button>
        )}
      </FlexVCenter>

      {initialValue?.syncroItemId && rating && rating >= 8 && (
        <FlexCol mt={40} gap={16}>
          <Divider />
          <Title order={4}>Recommend to users</Title>

          <RecommendItemToUsersList itemId={initialValue.syncroItemId} />
        </FlexCol>
      )}
    </Modal>
  )
}

export default EditRatingModal
