import { Button, Flex, Text } from '@mantine/core'
import { useMemo } from 'react'
import { useItemsRecommendationsFromMeQuery } from '../../../../../hooks/react-query/item-recommendation/useItemsRecommendationsFromMeQuery'
import useRecommendItemMutation from '../../../../../hooks/react-query/syncro-item/useRecommendItemMutation'
import { MutualSavedItemDto } from '../../../../../hooks/react-query/user/types/MutualSavedItemDto'
import useRecommendItemActionSheetStore from '../../../../../hooks/zustand/action-sheets/useRecommendItemActionSheetStore'
import { urls } from '../../../../../utils/urls'
import FlexCol from '../../../flex/FlexCol'
import FlexVCenter from '../../../flex/FlexVCenter'
import MyNextLink from '../../../overrides/MyNextLink'
import UserProfilePicture from '../../../UserProfilePicture/UserProfilePicture'

interface Props {
  mutual: MutualSavedItemDto
  itemId: string
}

const RecommendMutualItem = ({ mutual, itemId }: Props) => {
  const { mutate: submitRecommendItem, isLoading } = useRecommendItemMutation()

  const { data: itemsRecommended } = useItemsRecommendationsFromMeQuery()
  const { closeActionSheet } = useRecommendItemActionSheetStore()

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

  return (
    <Flex justify="space-between">
      <FlexVCenter>
        <MyNextLink
          href={urls.pages.user(mutual.user.id)}
          onClick={closeActionSheet}
        >
          <UserProfilePicture userId={mutual.user.id} widthHeigth={36} />
        </MyNextLink>

        <FlexCol ml={16}>
          <MyNextLink
            href={urls.pages.user(mutual.user.id)}
            onClick={() => {
              closeActionSheet()
            }}
          >
            <Text weight={500}>{mutual.user.username}</Text>
          </MyNextLink>
          {/* <Text></Text> */}
        </FlexCol>
      </FlexVCenter>
      <Flex>
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

        {/* {!itsAuthUser && <FollowUnfollowButton profileUserId={user.id} />} */}
      </Flex>
    </Flex>
  )
}

export default RecommendMutualItem
