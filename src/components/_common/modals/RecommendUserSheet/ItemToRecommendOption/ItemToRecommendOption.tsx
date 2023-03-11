import { Button, Flex, Text } from '@mantine/core'
import { useMemo } from 'react'
import { ItemToRecommendDto } from '../../../../../hooks/react-query/item-recommendation/types/ItemToRecommendDto'
import { useItemsRecommendationsFromMeQuery } from '../../../../../hooks/react-query/item-recommendation/useItemsRecommendationsFromMeQuery'
import useRecommendItemMutation from '../../../../../hooks/react-query/syncro-item/useRecommendItemMutation'
import { urls } from '../../../../../utils/urls'
import SyncroItemImage from '../../../image/SyncroItemImage/SyncroItemImage'
import MyNextLink from '../../../overrides/MyNextLink'

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
    <Flex gap={8} sx={{ flexGrow: 1 }}>
      <MyNextLink href={urls.pages.syncroItem(item.id)}>
        <SyncroItemImage item={item} width={100} height={100} />
      </MyNextLink>

      <Flex justify={'space-between'} sx={{ flexGrow: 1 }}>
        <Flex>
          <MyNextLink href={urls.pages.syncroItem(item.id)}>
            <Text>
              {item.title} {item.year && `(${item.year})`}
            </Text>
          </MyNextLink>
        </Flex>
        <Button
          styles={(theme) => ({
            root: {
              minWidth: 140,
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
      </Flex>
    </Flex>
  )
}

export default ItemToRecommendOption
