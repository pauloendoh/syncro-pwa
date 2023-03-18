import { ScrollArea, useMantineTheme } from '@mantine/core'
import { IoMdShareAlt } from 'react-icons/io'
import { MdBookmark, MdLink, MdStar } from 'react-icons/md'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useMyInterestQU } from '../../../../hooks/react-query/interest/useMyInterestsQuery'
import useToggleSaveItemMutation from '../../../../hooks/react-query/interest/useToggleSaveItemMutation'
import { useMyRatingQU } from '../../../../hooks/react-query/rating/useMyRatingsQuery'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import useRecommendItemActionSheetStore from '../../../../hooks/zustand/action-sheets/useRecommendItemActionSheetStore'
import useSaveRatingModalStore from '../../../../hooks/zustand/modals/useSaveRatingModalStore'
import { buildRatingDto } from '../../../../types/domain/rating/RatingDto'
import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'
import { urls } from '../../../../utils/urls'
import FlexVCenter from '../../flex/FlexVCenter'
import RatingRowButton from './RatingRowButton/RatingRowButton'

interface Props {
  syncroItem: SyncroItemDto
}

const RatingRow = ({ syncroItem }: Props) => {
  const myRating = useMyRatingQU(syncroItem.id)

  const myInterest = useMyInterestQU(syncroItem.id)

  const theme = useMantineTheme()

  const openRatingModal = useSaveRatingModalStore((s) => s.openModal)

  const { mutate: submitToggleSave } = useToggleSaveItemMutation()

  const openExternalLink = () => {
    if (!window) {
      return
    }
    if (syncroItem.type === 'game') {
      if (!syncroItem.igdbUrl) {
        alert('No external link available')
        return
      }

      window.open(syncroItem.igdbUrl, '_blank')
      return
    }
    if (syncroItem.type === 'manga') {
      if (!syncroItem.mangaMalUrl) {
        alert('No external link available')
        return
      }
      window.open(syncroItem.mangaMalUrl, '_blank')
      return
    }

    if (syncroItem.type === 'book') {
      if (!syncroItem.openLibraryUrl) {
        alert('No external link available')
        return
      }
      window.open(syncroItem.openLibraryUrl, '_blank')
      return
    }

    window.open(urls.others.imdbItem(syncroItem.id), '_blank')
  }

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
        <RatingRowButton
          onClick={() =>
            openRatingModal(
              myRating || buildRatingDto({ syncroItemId: syncroItem.id })
            )
          }
          isActive={!!myRating?.ratingValue}
          leftIcon={<MdStar color={theme.colors.dark[0]} size={16} />}
        >
          {myRating?.ratingValue || 'Rate'}
        </RatingRowButton>

        <RatingRowButton
          ml={2}
          onClick={() => submitToggleSave(syncroItem.id)}
          isActive={!!myInterest?.interestLevel}
          leftIcon={<MdBookmark color={theme.colors.dark[0]} size={16} />}
        >
          {myInterest?.interestLevel ? 'Planned' : typeMap.planTo}
        </RatingRowButton>

        <RatingRowButton
          ml={2}
          onClick={() => openRecommendItemModal(syncroItem.id)}
          leftIcon={<IoMdShareAlt color={theme.colors.dark[0]} size={16} />}
        >
          Recommend
        </RatingRowButton>

        <RatingRowButton
          ml={2}
          onClick={openExternalLink}
          leftIcon={<MdLink color={theme.colors.dark[0]} size={16} />}
        >
          {typeMap.site}
        </RatingRowButton>
      </FlexVCenter>
    </ScrollArea>
  )
}

export default RatingRow
