import { Button, Flex, Text } from '@mantine/core'
import { useMemo } from 'react'
import { ItemToRecommendDto } from '../../../../../hooks/react-query/item-recommendation/types/ItemToRecommendDto'
import { useItemsRecommendationsFromMeQuery } from '../../../../../hooks/react-query/item-recommendation/useItemsRecommendationsFromMeQuery'
import useRecommendItemMutation from '../../../../../hooks/react-query/syncro-item/useRecommendItemMutation'
import SyncroItemLink from '../../../SyncroItemLink/SyncroItemLink'
import FlexCol from '../../../flex/FlexCol'
import SyncroItemImage from '../../../image/SyncroItemImage/SyncroItemImage'

interface Props {
  itemToRecommend: ItemToRecommendDto
  userId: string
}

const ItemToRecommendOption = ({ itemToRecommend, userId }: Props) => {
  const { item, myRating, theySaved, theirRating } = itemToRecommend

  const { data: myRecommendations } = useItemsRecommendationsFromMeQuery()
  const [isEnabled, buttonLabel] = useMemo<[boolean, string]>(() => {
    if (theirRating && theirRating > 0) return [false, `Rated ${theirRating}`]
    if (theySaved) return [false, 'Saved']

    if (
      myRecommendations?.find(
        (r) => r.itemId === item.id && userId === r.toUserId
      )
    )
      return [false, 'Recommended']

    return [true, 'Recommend']
  }, [myRecommendations, theySaved])

  const { mutate: submitRecommendItem, isLoading } = useRecommendItemMutation()

  return (
    <Flex gap={16} sx={{ flexGrow: 1 }}>
      <SyncroItemLink item={item}>
        <SyncroItemImage item={item} width={100} height={100} />
      </SyncroItemLink>

      <FlexCol justify={'space-between'} sx={{ flexGrow: 1 }}>
        <Flex>
          <SyncroItemLink item={item}>
            <Text lineClamp={2}>
              {item.title} {item.year && `[${item.year}]`}
            </Text>
          </SyncroItemLink>
        </Flex>
        <Button
          styles={(theme) => ({
            root: {
              width: 140,
            },
            label: {
              color: isEnabled ? theme.colors.dark[0] : theme.colors.dark[2],
            },
          })}
          disabled={!isEnabled}
          loading={isLoading}
          color={isEnabled ? 'primary' : 'gray'}
          onClick={() => {
            submitRecommendItem({
              userId: userId,
              itemId: item.id,
            })
          }}
        >
          {buttonLabel}
        </Button>
      </FlexCol>
    </Flex>
  )
}

export default ItemToRecommendOption
