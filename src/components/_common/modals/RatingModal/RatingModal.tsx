import {
  ActionIcon,
  Box,
  Button,
  Modal,
  Rating,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
import useSaveRatingMutation from '../../../../hooks/react-query/rating/useSaveRatingMutation'
import { useSyncroItemDetailsQuery } from '../../../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery'
import useRatingModalStore from '../../../../hooks/zustand/modals/useRatingModalStore'
import { RatingDto } from '../../../../types/domain/rating/RatingDto'
import FlexVCenter from '../../flex/FlexVCenter'
import { getLabelByRatingValue } from './getLabelByRatingValue/getLabelByRatingValue'

const RatingModal = () => {
  const { isOpen, initialValue, closeModal } = useRatingModalStore()

  const { mutate, isLoading } = useSaveRatingMutation()
  // const { mutate: mutateDeleteTag } = useDeleteTagMutation()

  const onSubmit = async (data: RatingDto) => {
    mutate(data, {
      onSuccess: closeModal,
    })
  }

  const theme = useMantineTheme()

  const { data: syncroItem } = useSyncroItemDetailsQuery(
    initialValue?.syncroItemId
  )

  const [rating, setRating] = useState<number | null>(null)
  useEffect(() => {
    setRating(initialValue?.ratingValue || null)
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

  return (
    <Modal
      opened={isOpen}
      onClose={closeModal}
      title={
        <FlexVCenter justify="space-between">
          <Title order={4}>How would you rate {syncroItem?.title}?</Title>
        </FlexVCenter>
      }
      withCloseButton={false}
    >
      <FlexVCenter mt={24} justify="space-between">
        <Rating
          value={rating || 0}
          onChange={handleChangeRating}
          color={'secondary'}
          size="xl"
          count={10}
        />

        <ActionIcon onClick={() => setRating(null)} size="lg">
          <MdClose onClick={() => setRating(null)} size={24} />
        </ActionIcon>
      </FlexVCenter>

      <Box mt={40} />
      <Button
        disabled={!initialValue?.id && rating === null}
        fullWidth
        onClick={() => {
          if (initialValue) onSubmit({ ...initialValue, ratingValue: rating })
        }}
        color="secondary"
        loading={isLoading}
      >
        {initialValue?.ratingValue && rating === null
          ? 'Remove rating'
          : getLabelByRatingValue(rating)}
      </Button>
    </Modal>
  )
}

export default RatingModal
