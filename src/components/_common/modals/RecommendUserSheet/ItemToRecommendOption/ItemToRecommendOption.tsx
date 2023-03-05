import { Button, Flex, Text } from '@mantine/core'
import { useMemo } from 'react'
import { useItemsRecommendationsFromMeQuery } from '../../../../../hooks/react-query/item-recommendation/useItemsRecommendationsFromMeQuery'
import { ItemToRecommendDto } from '../../../../../hooks/react-query/item-recommendation/useItemsToRecommendQuery'
import useRecommendItemMutation from '../../../../../hooks/react-query/syncro-item/useRecommendItemMutation'
import { urls } from '../../../../../utils/urls'
import SyncroItemImage from '../../../image/SyncroItemImage/SyncroItemImage'
import MyNextLink from '../../../overrides/MyNextLink'

interface Props {
  itemToRecommend: ItemToRecommendDto
  userId: string
}

const ItemToRecommendOption = ({
  itemToRecommend: itemToRecommend,
  userId,
}: Props) => {
  const { item, myRating, theySaved } = itemToRecommend

  const { data: myRecommendations } = useItemsRecommendationsFromMeQuery()
  const buttonLabel = useMemo(() => {
    if (theySaved) return 'Already saved'

    if (
      myRecommendations?.find(
        (r) => r.itemId === item.id && userId === r.toUserId
      )
    )
      return 'Recommended'

    return 'Recommend'
  }, [myRecommendations, theySaved])

  const isDisabled = useMemo(
    () => buttonLabel === 'Already saved' || buttonLabel === 'Recommended',

    [buttonLabel]
  )

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
              color: isDisabled ? theme.colors.dark[2] : theme.colors.dark[0],
            },
          })}
          disabled={isDisabled}
          loading={isLoading}
          color={isDisabled ? 'gray' : 'primary'}
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
