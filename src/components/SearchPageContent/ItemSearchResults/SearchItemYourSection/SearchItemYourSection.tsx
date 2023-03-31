import { Box, Text, useMantineTheme } from '@mantine/core'
import {
  MdBookmark,
  MdBookmarkBorder,
  MdStar,
  MdStarBorder,
} from 'react-icons/md'
import { useMyInterestQueryUtils } from '../../../../hooks/react-query/interest/useMyInterestQueryUtils'
import useToggleSaveItemMutation from '../../../../hooks/react-query/interest/useToggleSaveItemMutation'
import { useMyRatingQueryUtils } from '../../../../hooks/react-query/rating/useMyRatingQueryUtils'
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

  const myRating = useMyRatingQueryUtils(props.itemId)

  const myInterest = useMyInterestQueryUtils(props.itemId)
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
            {myRating && myRating.ratingValue && myRating.ratingValue > 0 ? (
              <MdStar color={theme.colors.secondary[9]} size={18} />
            ) : (
              <MdStarBorder color={theme.colors.gray[5]} size={18} />
            )}
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
            {myInterest ? (
              <MdBookmark color={theme.colors.secondary[9]} size={18} />
            ) : (
              <MdBookmarkBorder color={theme.colors.gray[5]} size={18} />
            )}
          </FlexVCenter>

          <Text>{myInterest ? 'Planned' : 'Plan'}</Text>
        </FlexVCenter>
      </Box>
    </>
  )
}

export default SearchItemYourSection
