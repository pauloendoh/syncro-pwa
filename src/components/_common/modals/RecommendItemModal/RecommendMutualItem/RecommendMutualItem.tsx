import { Button, Flex, Text } from '@mantine/core'
import { useMemo } from 'react'
import { useSyncroItemTypeMap } from '../../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useItemsRecommendationsFromMeQuery } from '../../../../../hooks/react-query/item-recommendation/useItemsRecommendationsFromMeQuery'
import useRecommendItemMutation from '../../../../../hooks/react-query/syncro-item/useRecommendItemMutation'
import { MutualSavedItemDto } from '../../../../../hooks/react-query/user/types/MutualSavedItemDto'
import { useMyMediaQuery } from '../../../../../hooks/useMyMediaQuery'
import { SyncroItemType } from '../../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { urls } from '../../../../../utils/urls/urls'
import { getRatingSimilarityLabel } from '../../../../ExplorePageContent/SimilarUserList/getRatingSimilarityLabel/getRatingSimilarityLabel'
import UserProfilePicture from '../../../UserProfilePicture/UserProfilePicture'
import FlexCol from '../../../flex/FlexCol'
import FlexVCenter from '../../../flex/FlexVCenter'
import MyNextLink from '../../../overrides/MyNextLink'
import Span from '../../../text/Span'

interface Props {
  mutual: MutualSavedItemDto
  itemId: string
  itemType: SyncroItemType
}

const RecommendMutualItem = ({ mutual, itemId, ...props }: Props) => {
  const { mutate: submitRecommendItem, isLoading } = useRecommendItemMutation()

  const { data: itemsRecommended } = useItemsRecommendationsFromMeQuery()

  const isAlreadyRecommended = useMemo(() => {
    if (!itemsRecommended) return false
    return !!itemsRecommended.find(
      (r) => r.toUserId === mutual.user.id && r.itemId === itemId
    )
  }, [itemsRecommended])

  const [isDisabled, buttonLabel] = useMemo<[boolean, string]>(() => {
    if (mutual.theirRating && mutual.theirRating > 0)
      return [true, `Rated ${mutual.theirRating}`]
    if (mutual.isSaved) return [true, 'Saved']
    if (isAlreadyRecommended) return [true, 'Recommended']
    return [false, 'Recommend']
  }, [mutual, isAlreadyRecommended])

  const { isMobile } = useMyMediaQuery()

  const typeMap = useSyncroItemTypeMap({ itemType: props.itemType })

  return (
    <Flex justify="space-between">
      <FlexVCenter>
        <MyNextLink href={urls.pages.userProfile(mutual.user.id)}>
          <UserProfilePicture userId={mutual.user.id} widthHeigth={32} />
        </MyNextLink>

        <FlexCol ml={8}>
          <MyNextLink href={urls.pages.userProfile(mutual.user.id)}>
            <Text weight={500} maw={120} truncate>
              {mutual.user.username}
            </Text>
          </MyNextLink>
          {mutual.similarity && (
            <Span size="xs">
              {isMobile
                ? `${Math.floor(
                    mutual.similarity.overallPercentage * 100
                  )}% ${typeMap.getTypeLabelLowerCase()} similarity`
                : getRatingSimilarityLabel({
                    similarityDto: mutual.similarity,
                    sharedItemType: props.itemType,
                  })}
            </Span>
          )}
        </FlexCol>
      </FlexVCenter>
      <Button
        styles={(theme) => ({
          root: {
            width: 140,
          },
          label: {
            color: isDisabled ? theme.colors.dark[2] : theme.colors.dark[0],
          },
        })}
        disabled={isDisabled}
        loading={isLoading}
        color={isDisabled ? 'gray' : 'primary'}
        onClick={() => {
          submitRecommendItem({
            userId: mutual.user.id,
            itemId: itemId!,
          })
        }}
      >
        {buttonLabel}
      </Button>
    </Flex>
  )
}

export default RecommendMutualItem
