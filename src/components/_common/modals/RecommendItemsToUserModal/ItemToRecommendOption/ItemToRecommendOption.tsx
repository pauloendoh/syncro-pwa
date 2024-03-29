import { Button } from '@mantine/core'
import { useMemo } from 'react'
import { ItemToRecommendDto } from '../../../../../hooks/react-query/item-recommendation/types/ItemToRecommendDto'
import { useItemsRecommendationsFromMeQuery } from '../../../../../hooks/react-query/item-recommendation/useItemsRecommendationsFromMeQuery'
import useRecommendItemMutation from '../../../../../hooks/react-query/syncro-item/useRecommendItemMutation'
import { useMyMediaQuery } from '../../../../../hooks/useMyMediaQuery'
import FavoriteItem from '../../../../UserProfilePage/FavoritesSection/FavoritesByType/FavoritesByType/FavoriteItem/FavoriteItem'
import FlexCol from '../../../flex/FlexCol'

interface Props {
  itemToRecommend: ItemToRecommendDto
  userId: string
}

const ItemToRecommendOption = ({ itemToRecommend, userId }: Props) => {
  const { item, theySaved, theirRating } = itemToRecommend

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
  const { isMobile } = useMyMediaQuery()

  const width = useMemo(() => (isMobile ? 100 : 120), [isMobile])

  return (
    <FlexCol gap={4} mt={8}>
      <FavoriteItem item={item} alwaysShowTitle width={width} disablePreview />
      <Button
        styles={(theme) => ({
          root: {
            width: width,
            paddingInline: 0,
          },
          label: {
            color: isEnabled ? theme.colors.dark[0] : theme.colors.dark[2],
            fontSize: 12,
            fontWeight: 'normal',
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
  )

  // return (
  //   <Flex gap={16} sx={{ flexGrow: 1 }}>
  //     <SyncroItemLink item={item} disablePreview>
  //       <SyncroItemImage item={item} width={100} height={100} />
  //     </SyncroItemLink>

  //     <FlexCol justify={'space-between'} sx={{ flexGrow: 1 }}>
  //       <Flex>
  //         <SyncroItemLink item={item} disablePreview>
  //           <Text lineClamp={2}>
  //             {item.title} {item.year && `[${item.year}]`}
  //           </Text>
  //         </SyncroItemLink>
  //       </Flex>
  //       <Button
  //         styles={(theme) => ({
  //           root: {
  //             width: 140,
  //           },
  //           label: {
  //             color: isEnabled ? theme.colors.dark[0] : theme.colors.dark[2],
  //           },
  //         })}
  //         disabled={!isEnabled}
  //         loading={isLoading}
  //         color={isEnabled ? 'primary' : 'gray'}
  //         onClick={() => {
  //           submitRecommendItem({
  //             userId: userId,
  //             itemId: item.id,
  //           })
  //         }}
  //       >
  //         {buttonLabel}
  //       </Button>
  //     </FlexCol>
  //   </Flex>
  // )
}

export default ItemToRecommendOption
