import { Text, useMantineTheme } from '@mantine/core'
import { memo, useMemo } from 'react'
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md'
import { useMyInterestsQuery } from '../../../../hooks/react-query/interest/useMyInterestsQuery'
import useToggleSaveItemMutation from '../../../../hooks/react-query/interest/useToggleSaveItemMutation'
import { RatingDto } from '../../../../types/domain/rating/RatingDto'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import PressableMyRating from './PressableMyRating/PressableMyRating'

interface Props {
  rating: RatingDto
}

const HomeRatingItemButtons = (props: Props) => {
  const theme = useMantineTheme()
  const { data: myInterests } = useMyInterestsQuery()

  const myInterest = useMemo(
    () =>
      myInterests?.find((r) => r.syncroItemId === props.rating.syncroItemId) ||
      null,
    [myInterests, props.rating.syncroItemId]
  )

  const { mutate: submitToggleSave } = useToggleSaveItemMutation()

  return (
    <FlexVCenter mt={2} gap={32}>
      <PressableMyRating itemId={props.rating.syncroItemId!} />

      <FlexVCenter
        sx={(theme) => ({
          color: myInterest ? theme.colors.secondary[9] : theme.colors.dark[0],
          cursor: 'pointer',
        })}
        onClick={() => {
          if (props.rating.syncroItemId) {
            submitToggleSave(props.rating.syncroItemId)
          }
        }}
      >
        <FlexVCenter gap={4}>
          {myInterest ? (
            <MdBookmark size={24} />
          ) : (
            <MdBookmarkBorder
              color={myInterest ? theme.colors.secondary[9] : undefined}
              size={24}
            />
          )}

          <Text w={48}>{myInterest ? 'Saved' : 'Save'}</Text>
        </FlexVCenter>
      </FlexVCenter>
    </FlexVCenter>
  )
}

export default memo(HomeRatingItemButtons)
