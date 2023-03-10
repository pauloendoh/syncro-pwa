import { Box, Flex, Text, useMantineTheme } from '@mantine/core'
import { useQueryClient } from '@tanstack/react-query'
import { MdBookmark, MdStar } from 'react-icons/md'
import { useSyncroItemTypeMap } from '../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useUserInfoQuery } from '../../../hooks/react-query/user/useUserInfoQuery'
import { useMyColors } from '../../../hooks/useMyColors'
import { useMyRouterQuery } from '../../../hooks/useMyRouterQuery'
import useRatingDetailsModalStore from '../../../hooks/zustand/modals/useRatingDetailsModalStore'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { UserItemDto } from '../../../types/domain/syncro-item/UserItemDto'
import { urls } from '../../../utils/urls'
import SearchItemImdbSection from '../../SearchPageContent/ItemSearchResults/ImdbSearchItem/SearchItemImdbSection/SearchItemImdbSection'
import SearchItemYourSection from '../../SearchPageContent/ItemSearchResults/SearchItemYourSection/SearchItemYourSection'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import SyncroItemImage from '../../_common/image/SyncroItemImage/SyncroItemImage'
import MyNextLink from '../../_common/overrides/MyNextLink'

interface Props {
  item: UserItemDto
  onPress: () => void
  thisIsYourList: boolean
  itemType: SyncroItemType
  isCustomOrdering: boolean
}

const UserItem = ({ item, itemType, ...props }: Props) => {
  const { ratingYellow } = useMyColors()

  const itemTypeMap = useSyncroItemTypeMap({
    itemType: itemType,
  })

  const theme = useMantineTheme()

  const { userId } = useMyRouterQuery()

  const { data: userInfo } = useUserInfoQuery(userId)

  const { openModal: openRatingDetailsModal } = useRatingDetailsModalStore()

  const queryClient = useQueryClient()
  const handleClick = () => {
    if (item) {
      queryClient.setQueryData<SyncroItemDto>(
        [urls.api.syncroItemDetails(item.id)],
        item
      )
    }
  }

  return (
    <Box>
      <Flex gap={16}>
        <Box onClick={props.onPress}>
          <MyNextLink
            href={urls.pages.syncroItem(item.id)}
            onClick={handleClick}
          >
            <SyncroItemImage height={120} width={120} item={item} />
          </MyNextLink>
        </Box>

        <FlexCol style={{ flexShrink: 1 }}>
          <MyNextLink
            href={urls.pages.syncroItem(item.id)}
            onClick={handleClick}
          >
            <Text style={{ fontWeight: '500' }}>
              {item.title} {item.year && `(${item.year})`}
            </Text>
          </MyNextLink>

          <Flex mt={16}>
            <FlexCol w={120}>
              {props.thisIsYourList ? (
                props.isCustomOrdering ? (
                  <></>
                ) : (
                  <SearchItemImdbSection
                    avgRating={item.avgRating}
                    ratingCount={item.ratingCount}
                    title={itemTypeMap.site}
                  />
                )
              ) : (
                <>
                  <Text weight={500}>{userInfo?.username}</Text>

                  <Flex gap={4}>
                    <FlexVCenter style={{ width: 24 }}>
                      <MdStar
                        color={
                          item.ratings?.[0]?.ratingValue
                            ? ratingYellow
                            : theme.colors.gray[5]
                        }
                        size={18}
                      />
                    </FlexVCenter>
                    {item.ratings?.[0]?.ratingValue && (
                      <Text>{item.ratings?.[0]?.ratingValue || ''}</Text>
                    )}
                    {!!item.ratings?.[0]?.review && (
                      <Text
                        sx={{
                          fontStyle: 'italic',
                          color: theme.colors.gray[6],
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          if (item.ratings?.[0]) {
                            openRatingDetailsModal(item.ratings?.[0])
                          }
                        }}
                      >
                        (Review)
                      </Text>
                    )}
                  </Flex>
                  {item.interests?.[0]?.interestLevel && (
                    <FlexVCenter gap={4}>
                      <FlexCol style={{ width: 24 }}>
                        <MdBookmark
                          color={
                            item.interests?.[0]?.interestLevel
                              ? ratingYellow
                              : theme.colors.gray[5]
                          }
                          size={18}
                        />
                      </FlexCol>
                      <Text>
                        {item.interests?.[0]?.interestLevel && 'Saved'}
                      </Text>
                    </FlexVCenter>
                  )}
                </>
              )}
            </FlexCol>
            <FlexCol>
              <SearchItemYourSection itemId={item.id} />
            </FlexCol>
          </Flex>
        </FlexCol>
      </Flex>
    </Box>
  )
}

export default UserItem
