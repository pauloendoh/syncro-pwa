import { Box, Text, useMantineTheme } from '@mantine/core'
import { useMemo } from 'react'
import { MdBookmark, MdStar } from 'react-icons/md'
import { useMyInterestsQuery } from '../../../../hooks/react-query/interest/useMyInterestsQuery'
import useToggleSaveItemMutation from '../../../../hooks/react-query/interest/useToggleSaveItemMutation'
import { useMyRatingsQuery } from '../../../../hooks/react-query/rating/useMyRatingsQuery'
import useRatingDetailsModalStore from '../../../../hooks/zustand/modals/useRatingDetailsModalStore'
import useSaveRatingModalStore from '../../../../hooks/zustand/modals/useSaveRatingModalStore'
import { buildRatingDto } from '../../../../types/domain/rating/RatingDto'
import FlexVCenter from '../../../_common/flex/FlexVCenter'

interface Props {
  itemId: string
}

const SearchItemYourSection = (props: Props) => {
  const theme = useMantineTheme()

  const { mutate: submitToggleSave } = useToggleSaveItemMutation()

  const { openModal: openRatingModal } = useSaveRatingModalStore()

  const { data: myRatings } = useMyRatingsQuery()

  const { data: myInterests } = useMyInterestsQuery()

  // PE 1/3 - DRY
  const myRating = useMemo(
    () => myRatings?.find((r) => r.syncroItemId === props.itemId) || null,
    [myRatings, props.itemId]
  )

  const myInterest = useMemo(
    () => myInterests?.find((r) => r.syncroItemId === props.itemId) || null,
    [myInterests, props.itemId]
  )

  const { openModal: openRatingDetailsModal } = useRatingDetailsModalStore()

  return (
    <>
      <Text>You</Text>
      <FlexVCenter gap={4}>
        <FlexVCenter
          gap={4}
          sx={{
            cursor: 'pointer',
          }}
          onClick={() => {
            openRatingModal(
              myRating || buildRatingDto({ syncroItemId: props.itemId })
            )
          }}
        >
          <FlexVCenter style={{ width: 24 }}>
            <MdStar
              color={
                myRating && myRating.ratingValue && myRating.ratingValue > 0
                  ? theme.colors.secondary[9]
                  : theme.colors.gray[5]
              }
              size={18}
            />
          </FlexVCenter>
          <Text>{myRating?.ratingValue || <Text>&nbsp;</Text>}</Text>
        </FlexVCenter>

        {!!myRating?.review && (
          <Text
            sx={{
              fontStyle: 'italic',
              color: theme.colors.gray[6],
              cursor: 'pointer',
            }}
            onClick={() => {
              openRatingDetailsModal(myRating)
            }}
          >
            (Review)
          </Text>
        )}
      </FlexVCenter>

      <Box
        sx={{
          cursor: 'pointer',
        }}
        onClick={() => {
          submitToggleSave(props.itemId)
        }}
      >
        <FlexVCenter gap={4}>
          <FlexVCenter style={{ width: 24 }}>
            <MdBookmark
              color={
                myInterest ? theme.colors.secondary[9] : theme.colors.gray[5]
              }
              size={18}
            />
          </FlexVCenter>

          <Text>{myInterest ? 'Planned' : 'Plan to'}</Text>
        </FlexVCenter>
      </Box>
    </>
  )
}

export default SearchItemYourSection
