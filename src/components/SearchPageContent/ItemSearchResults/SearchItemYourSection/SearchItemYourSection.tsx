import { Text, useMantineTheme } from '@mantine/core'
import { MdStarBorder } from 'react-icons/md'
import { useMyInterestQueryUtils } from '../../../../hooks/react-query/interest/useMyInterestQueryUtils'
import useToggleSaveItemMutation from '../../../../hooks/react-query/interest/useToggleSaveItemMutation'
import { useMyItemRatingQueryUtils } from '../../../../hooks/react-query/rating/useMyItemRatingQueryUtils'
import { useRatingDetailsModalStore } from '../../../../hooks/zustand/modals/useRatingDetailsModalStore'
import useSaveRatingModalStore from '../../../../hooks/zustand/modals/useSaveRatingModalStore'
import useAuthStore from '../../../../hooks/zustand/useAuthStore'
import { buildRatingDto } from '../../../../types/domain/rating/RatingDto'
import { ratingStatusArray } from '../../../../types/domain/rating/ratingStatusArray'
import FlexVCenter from '../../../_common/flex/FlexVCenter'

interface Props {
  itemId: string
}

const SearchItemYourSection = (props: Props) => {
  const theme = useMantineTheme()

  const { mutate: submitToggleSave } = useToggleSaveItemMutation()

  const { openModal: openRatingModal } = useSaveRatingModalStore()

  const myRating = useMyItemRatingQueryUtils(props.itemId)

  const myInterest = useMyInterestQueryUtils(props.itemId)
  const { openModal: openRatingDetailsModal } = useRatingDetailsModalStore()

  const { authUser } = useAuthStore()

  const ratingIconOption = ratingStatusArray.find(
    (r) => r.value === myRating?.status
  )

  const RatingIcon = ratingIconOption?.IconWithProps

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
          <FlexVCenter>
            {myRating ? (
              <>
                {RatingIcon && <RatingIcon color={theme.colors.secondary[9]} />}
              </>
            ) : (
              <>
                <MdStarBorder color={theme.colors.gray[5]} size={18} />
              </>
            )}
          </FlexVCenter>
          <Text>{myRating?.ratingValue || <Text>Save</Text>}</Text>
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

      {/* <Box
        sx={{
          cursor: 'pointer',
        }}
        onClick={() => {
          submitToggleSave({
            itemId: props.itemId,
          })
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
      </Box> */}
    </>
  )
}

export default SearchItemYourSection
