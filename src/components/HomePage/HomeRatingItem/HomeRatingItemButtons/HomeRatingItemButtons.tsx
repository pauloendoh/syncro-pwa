import { useMantineTheme } from '@mantine/core'
import { memo, useMemo } from 'react'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useMyInterestsQuery } from '../../../../hooks/react-query/interest/useMyInterestsQuery'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import useAuthStore from '../../../../hooks/zustand/useAuthStore'
import { RatingDto } from '../../../../types/domain/rating/RatingDto'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import HomeRatingMoreMenu from './HomeRatingMoreMenu/HomeRatingMoreMenu'
import MyRatingButton from './MyRatingButton/MyRatingButton'
import ReplyToRatingSection from './ReplyToRatingSection/ReplyToRatingSection'

interface Props {
  syncroItemId: string
  gap?: number
  itemType?: SyncroItemType
  hideMoreMenu?: boolean
  rating?: RatingDto
}

const HomeRatingItemButtons = (props: Props) => {
  const theme = useMantineTheme()
  const { data: myInterests } = useMyInterestsQuery()

  const myInterest = useMemo(
    () =>
      myInterests?.find((r) => r.syncroItemId === props.syncroItemId) || null,
    [myInterests, props.syncroItemId]
  )

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

  const { isMobile } = useMyMediaQuery()

  if (!authUser) return null
  return (
    <FlexVCenter mt={2} gap={props.gap || (isMobile ? 18 : 24)}>
      <MyRatingButton itemId={props.syncroItemId!} />
      {/* <Tooltip label={bookmarkTooltipLabel} >
        <FlexVCenter
          sx={(theme) => ({
            color: myInterest
              ? theme.colors.secondary[9]
              : theme.colors.dark[0],
            cursor: 'pointer',
          })}
          onClick={() => {
            if (props.syncroItemId) {
              submitToggleSave({
                itemId: props.syncroItemId,
              })
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
      </Tooltip> */}

      {props.rating && <ReplyToRatingSection rating={props.rating} />}

      {!props.hideMoreMenu && (
        <HomeRatingMoreMenu rating={props.rating} itemId={props.syncroItemId} />
      )}
    </FlexVCenter>
  )
}

export default memo(HomeRatingItemButtons)
