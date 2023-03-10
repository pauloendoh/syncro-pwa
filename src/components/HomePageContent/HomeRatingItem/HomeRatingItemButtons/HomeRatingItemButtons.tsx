import { Text, useMantineTheme } from '@mantine/core'
import { memo, useMemo } from 'react'
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md'
import { useMyInterestsQuery } from '../../../../hooks/react-query/interest/useMyInterestsQuery'
import useToggleSaveItemMutation from '../../../../hooks/react-query/interest/useToggleSaveItemMutation'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import PressableMyRating from './PressableMyRating/PressableMyRating'

interface Props {
  syncroItemId: string
  gap?: number
}

const HomeRatingItemButtons = (props: Props) => {
  const theme = useMantineTheme()
  const { data: myInterests } = useMyInterestsQuery()

  const myInterest = useMemo(
    () =>
      myInterests?.find((r) => r.syncroItemId === props.syncroItemId) || null,
    [myInterests, props.syncroItemId]
  )

  const { mutate: submitToggleSave } = useToggleSaveItemMutation()

  return (
    <FlexVCenter mt={2} gap={props.gap ?? 32}>
      <PressableMyRating itemId={props.syncroItemId!} />

      <FlexVCenter
        sx={(theme) => ({
          color: myInterest ? theme.colors.secondary[9] : theme.colors.dark[0],
          cursor: 'pointer',
        })}
        onClick={() => {
          if (props.syncroItemId) {
            submitToggleSave(props.syncroItemId)
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
