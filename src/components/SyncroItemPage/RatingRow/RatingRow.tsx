import { ScrollArea, useMantineTheme } from '@mantine/core'
import { useMemo } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { IoMdShareAlt } from 'react-icons/io'
import {
  MdBookmark,
  MdBookmarkBorder,
  MdLink,
  MdStarBorder,
} from 'react-icons/md'
import { useSyncroItemTypeMap } from '../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useFavoriteItemsQuery } from '../../../hooks/react-query/favorite-item/useFavoriteItemsQuery'
import useToggleFavoriteItemMutation from '../../../hooks/react-query/favorite-item/useToggleFavoriteItemMutation'
import { useMyInterestQU } from '../../../hooks/react-query/interest/useMyInterestsQuery'
import useToggleSaveItemMutation from '../../../hooks/react-query/interest/useToggleSaveItemMutation'
import { useMyRatingQU } from '../../../hooks/react-query/rating/useMyRatingsQuery'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import useRecommendItemModalStore from '../../../hooks/zustand/modals/useRecommendItemModalStore'
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

  const openRecommendItemModal = useRecommendItemModalStore((s) => s.openModal)

  const typeMap = useSyncroItemTypeMap({
    itemType: syncroItem.type,
  })
  const { isSmallScreen } = useMyMediaQuery()

  const { mutate: submitToggleFavorite, isLoading: toggleFavoriteIsLoading } =
    useToggleFavoriteItemMutation()

  const { data: favorites } = useFavoriteItemsQuery({ userId: authUser?.id })
  const isFavorited = useMemo(() => {
    return !!favorites?.find((f) => f.syncroItemId === syncroItem.id)
  }, [favorites, syncroItem.id])

  return (
    <ScrollArea pb={8}>
      <FlexVCenter gap={isSmallScreen ? 4 : 8} pb={isSmallScreen ? 16 : 0}>
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
                  ?.icon || (
                  <MdStarBorder color={theme.colors.dark[0]} size={16} />
                )
              }
            >
              {myRating?.ratingValue || 'Rate'}
            </RatingRowButton>

            <RatingRowButton
              ml={2}
              onClick={() =>
                submitToggleSave({
                  itemId: syncroItem.id,
                })
              }
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
              onClick={() => submitToggleFavorite(syncroItem.id)}
              isActive={!!isFavorited}
              leftIcon={
                isFavorited ? (
                  <AiFillHeart color={theme.colors.dark[0]} size={16} />
                ) : (
                  <AiOutlineHeart color={theme.colors.dark[0]} size={16} />
                )
              }
              loading={toggleFavoriteIsLoading}
            >
              {isFavorited ? 'Favorited' : 'Favorite'}
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
            <RatingRowButton
              variant="outline"
              color="secondary"
              leftIcon={<MdStarBorder />}
            >
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
