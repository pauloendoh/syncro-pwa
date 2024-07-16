import { Button, Flex, ScrollArea, Title } from '@mantine/core'
import { useMemo } from 'react'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import useIgnoreItemRecommendations from '../../../../hooks/react-query/item-recommendation/useIgnoreItemRecommendations'
import { useItemRecommendationsForMeQuery } from '../../../../hooks/react-query/item-recommendation/useItemRecommendationsForMeQuery'
import useConfirmationModalStore from '../../../../hooks/zustand/modals/useConfirmationModalStore'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import ItemSavedByPreloaded from '../../../SyncroItemPage/ItemSavedBy/ItemSavedByPreloaded/ItemSavedByPreloaded'
import FavoriteItem from '../../../UserProfilePage/FavoritesSection/FavoritesByType/FavoritesByType/FavoriteItem/FavoriteItem'
import FlexCol from '../../../_common/flex/FlexCol'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import CenterLoader from '../../../_common/overrides/CenterLoader/CenterLoader'
import Span from '../../../_common/text/Span'

type Props = {
  type: SyncroItemType
}

const RecommendedForYouByType = ({ ...props }: Props) => {
  const typeMap = useSyncroItemTypeMap({
    itemType: props.type,
  })

  const { data, isLoading, refetch } = useItemRecommendationsForMeQuery(
    props.type
  )
  const { mutate: submitIgnore } = useIgnoreItemRecommendations()

  const hasAnyRatingsByFollowingUsers = useMemo(
    () =>
      data?.some(
        ({ ratingsByFollowingUsers }) => ratingsByFollowingUsers.length > 0
      ),
    [data]
  )

  const { openConfirmDialog } = useConfirmationModalStore()

  return (
    <FlexCol className="RecommendedForYouByType" gap={16}>
      <FlexVCenter justify={'space-between'}>
        <Title order={5}>{typeMap.getTypeLabel(true)}</Title>

        <FlexVCenter>
          <Button
            onClick={() => {
              openConfirmDialog({
                title: 'Ignore current recommendations',
                description: `Are you sure you want to ignore current ${typeMap
                  .getTypeLabel()
                  .toLowerCase()} recommendations?`,
                onConfirm: () => {
                  submitIgnore({
                    itemIds: data?.map(({ item }) => item.id) || [],
                    itemType: props.type,
                  })
                },
              })
            }}
            variant="subtle"
            color="dark"
            sx={{
              fontWeight: 500,
            }}
          >
            Ignore all
          </Button>
          <Button
            variant="subtle"
            color="dark"
            onClick={() => {
              refetch()
            }}
            sx={{
              fontWeight: 500,
            }}
          >
            Refresh
          </Button>
        </FlexVCenter>
      </FlexVCenter>
      <ScrollArea pb={16} h={hasAnyRatingsByFollowingUsers ? 240 : undefined}>
        <Flex gap={8}>
          {isLoading && <CenterLoader height={133} width="100%" />}
          {data?.map(({ item, ratingsByFollowingUsers }) => (
            <FlexCol key={item.id}>
              <FavoriteItem
                item={item}
                width={133}
                alwaysShowTitle
                showAvgRating
                onClose={() =>
                  submitIgnore({
                    itemIds: [item.id],
                    itemType: props.type,
                  })
                }
                onCloseTooltip="Not interested"
              />
              <ItemSavedByPreloaded
                itemId={item.id}
                ratings={ratingsByFollowingUsers}
              />
            </FlexCol>
          ))}
          {data?.length === 0 && <Span>No recommendations for you yet</Span>}
        </Flex>
      </ScrollArea>
    </FlexCol>
  )
}

export default RecommendedForYouByType
