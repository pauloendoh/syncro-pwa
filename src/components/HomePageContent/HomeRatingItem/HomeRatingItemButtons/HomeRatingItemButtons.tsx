import { Tooltip, useMantineTheme } from '@mantine/core'
import { memo, useMemo } from 'react'
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useMyInterestsQuery } from '../../../../hooks/react-query/interest/useMyInterestsQuery'
import useToggleSaveItemMutation from '../../../../hooks/react-query/interest/useToggleSaveItemMutation'
import useAuthStore from '../../../../hooks/zustand/useAuthStore'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import HomeRatingMoreMenu from './HomeRatingMoreMenu/HomeRatingMoreMenu'
import PressableMyRating from './PressableMyRating/PressableMyRating'

interface Props {
  syncroItemId: string
  gap?: number
  itemType?: SyncroItemType
  hideMoreMenu?: boolean
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

  const typeMap = useSyncroItemTypeMap({
    itemType: props.itemType,
  })

  const bookmarkTooltipLabel = useMemo(() => {
    if (typeMap) {
      if (myInterest) return typeMap.removeFromPlanTo
      if (typeMap) return typeMap.planTo
    }

    if (myInterest) {
      return 'Remove from planned items'
    }

    return 'Add to planned items'
  }, [myInterest, typeMap])

  const { authUser } = useAuthStore()

  if (!authUser) return null
  return (
    <FlexVCenter mt={2} gap={40}>
      <PressableMyRating itemId={props.syncroItemId!} />
      <Tooltip label={bookmarkTooltipLabel} withArrow>
        <FlexVCenter
          sx={(theme) => ({
            color: myInterest
              ? theme.colors.secondary[9]
              : theme.colors.dark[0],
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
          </FlexVCenter>
        </FlexVCenter>
      </Tooltip>
      {!props.hideMoreMenu && (
        <HomeRatingMoreMenu itemId={props.syncroItemId} />
      )}
    </FlexVCenter>
  )
}

export default memo(HomeRatingItemButtons)
