import { ScrollArea, Tooltip, useMantineTheme } from '@mantine/core'
import { useMemo } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { IoMdShareAlt } from 'react-icons/io'
import { MdLink, MdStarBorder } from 'react-icons/md'
import { useSyncroItemTypeMap } from '../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useFavoriteItemsQuery } from '../../../hooks/react-query/favorite-item/useFavoriteItemsQuery'
import useToggleFavoriteItemMutation from '../../../hooks/react-query/favorite-item/useToggleFavoriteItemMutation'
import { useMyItemRatingQueryUtils } from '../../../hooks/react-query/rating/useMyItemRatingQueryUtils'
import { useMyRatingsQuery } from '../../../hooks/react-query/rating/useMyRatingsQuery'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import useRecommendItemModalStore from '../../../hooks/zustand/modals/useRecommendItemModalStore'
import useSaveRatingModalStore from '../../../hooks/zustand/modals/useSaveRatingModalStore'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import { buildRatingDto } from '../../../types/domain/rating/RatingDto'
import { ratingStatusArray } from '../../../types/domain/rating/ratingStatusArray'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { urls } from '../../../utils/urls/urls'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import MyNextLink from '../../_common/overrides/MyNextLink'
import RatingRowButton from './RatingRowButton/RatingRowButton'

interface Props {
  syncroItem: SyncroItemDto
  isPreview?: boolean
}

const RatingRow = ({ syncroItem, ...props }: Props) => {
  const { authUser } = useAuthStore()
  const myRating = useMyItemRatingQueryUtils(syncroItem.id)

  const theme = useMantineTheme()

  const openRatingModal = useSaveRatingModalStore((s) => s.openModal)

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

    if (syncroItem.type === 'music') {
      return syncroItem.youtubeMusicUrl
    }

    if (syncroItem.type === 'goodreadsBook') {
      return syncroItem.goodreadsUrl
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

  const ratingButtonLabel = useMemo(() => {
    if (!myRating) return 'Save'
    if (myRating?.ratingValue) {
      return myRating?.ratingValue
    }

    const status = ratingStatusArray.find((s) => s.value === myRating?.status)
    if (status) {
      return status.label
    }
    return 'Rate'
  }, [myRating])

  const { data: myRatings, isLoading } = useMyRatingsQuery()

  return (
    <ScrollArea pb={16}>
      <FlexVCenter gap={isSmallScreen ? 4 : 8} pb={isSmallScreen ? 16 : 0}>
        {authUser && (
          <>
            <Tooltip
              label="Click here to save your first item"
              disabled={!!myRatings?.length || isLoading}
              withinPortal
              opened
            >
              <RatingRowButton
                onClick={() =>
                  openRatingModal(
                    myRating || buildRatingDto({ syncroItemId: syncroItem.id })
                  )
                }
                isActive={!!myRating}
                leftIcon={
                  ratingStatusArray.find((s) => s.value === myRating?.status)
                    ?.icon || (
                    <MdStarBorder color={theme.colors.dark[0]} size={16} />
                  )
                }
              >
                {ratingButtonLabel}
              </RatingRowButton>
            </Tooltip>

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
