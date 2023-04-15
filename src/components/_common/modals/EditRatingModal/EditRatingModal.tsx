import {
  Button,
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
import { zIndexes } from '../../../../utils/zIndexes'
import FlexVCenter from '../../flex/FlexVCenter'
import SaveCancelButtons from '../../inputs/SaveCancelButtons'
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

  const [rating, setRating] = useState<number | null>(null)
  const [reviewText, setReviewText] = useState('')
  useEffect(() => {
    setRating(initialValue?.ratingValue || null)
    setReviewText(initialValue?.review || '')
  }, [initialValue])

  const handleChangeRating = (newRating: number) => {
    console.log({
      newRating,
      rating,
    })
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
          top: isMobile ? 40 : 80,
          zIndex: zIndexes.editRatingModal,
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
    </Modal>
  )
}

export default EditRatingModal
