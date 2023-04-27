import { ScrollArea, useMantineTheme } from '@mantine/core'
import { useMemo } from 'react'
import { IoMdShareAlt } from 'react-icons/io'
import {
  MdBookmark,
  MdBookmarkBorder,
  MdLink,
  MdStarBorder,
} from 'react-icons/md'
import { useSyncroItemTypeMap } from '../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useMyInterestQU } from '../../../hooks/react-query/interest/useMyInterestsQuery'
import useToggleSaveItemMutation from '../../../hooks/react-query/interest/useToggleSaveItemMutation'
import { useMyRatingQU } from '../../../hooks/react-query/rating/useMyRatingsQuery'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import useRecommendItemActionSheetStore from '../../../hooks/zustand/action-sheets/useRecommendItemActionSheetStore'
import useSaveRatingModalStore from '../../../hooks/zustand/modals/useSaveRatingModalStore'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import { buildRatingDto } from '../../../types/domain/rating/RatingDto'
import { ratingStatusArrayMap } from '../../../types/domain/rating/ratingStatus'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { urls } from '../../../utils/urls'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import MyNextLink from '../../_common/overrides/MyNextLink'
import RatingRowButton from './RatingRowButton/RatingRowButton'

interface Props {
  syncroItem: SyncroItemDto
}

const RatingRow = ({ syncroItem }: Props) => {
  const { authUser } = useAuthStore()
  const myRating = useMyRatingQU(syncroItem.id)

  const myInterest = useMyInterestQU(syncroItem.id)

  const theme = useMantineTheme()

  const openRatingModal = useSaveRatingModalStore((s) => s.openModal)

  const { mutate: submitToggleSave, isLoading: toggleSaveIsLoading } =
    useToggleSaveItemMutation()

  const externalLink = useMemo(() => {
    if (syncroItem.type === 'game') {
      return syncroItem.igdbUrl
    }
    if (syncroItem.type === 'manga') {
      return syncroItem.mangaMalUrl
    }

    if (syncroItem.type === 'book') {
      return syncroItem.openLibraryUrl
    }

    return syncroItem.imdbUrl
  }, [syncroItem])

  const openRecommendItemModal = useRecommendItemActionSheetStore(
    (s) => s.openActionSheet
  )

  const typeMap = useSyncroItemTypeMap({
    itemType: syncroItem.type,
  })
  const { isSmallScreen } = useMyMediaQuery()

  return (
    <ScrollArea>
      <FlexVCenter gap={8} pb={isSmallScreen ? 16 : 0}>
        {authUser && (
          <>
            <RatingRowButton
              onClick={() =>
                openRatingModal(
                  myRating || buildRatingDto({ syncroItemId: syncroItem.id })
                )
              }
              isActive={!!myRating?.ratingValue}
              leftIcon={
                ratingStatusArrayMap.find((s) => s.value === myRating?.status)
                  ?.icon
              }
            >
              {myRating?.ratingValue || 'Rate'}
            </RatingRowButton>

            <RatingRowButton
              ml={2}
              onClick={() => submitToggleSave(syncroItem.id)}
              isActive={!!myInterest?.interestLevel}
              leftIcon={
                myInterest?.interestLevel ? (
                  <MdBookmark color={theme.colors.dark[0]} size={16} />
                ) : (
                  <MdBookmarkBorder color={theme.colors.dark[0]} size={16} />
                )
              }
              loading={toggleSaveIsLoading}
            >
              {myInterest?.interestLevel ? 'Planned' : typeMap.planTo}
            </RatingRowButton>

            <RatingRowButton
              ml={2}
              onClick={() => {
                openRecommendItemModal(syncroItem.id)
              }}
              leftIcon={<IoMdShareAlt color={theme.colors.dark[0]} size={16} />}
            >
              Recommend
            </RatingRowButton>
          </>
        )}

        {!authUser && (
          <MyNextLink href={urls.pages.signUp}>
            <RatingRowButton color="secondary" leftIcon={<MdStarBorder />}>
              Enter to start rating
            </RatingRowButton>
          </MyNextLink>
        )}

        <a
          href={String(externalLink)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <RatingRowButton
            ml={2}
            leftIcon={<MdLink color={theme.colors.dark[0]} size={16} />}
          >
            {typeMap.site}
          </RatingRowButton>
        </a>
      </FlexVCenter>
    </ScrollArea>
  )
}

export default RatingRow
