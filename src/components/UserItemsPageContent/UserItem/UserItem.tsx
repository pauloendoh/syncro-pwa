import { Box, Flex, Text } from '@mantine/core'
import { useSyncroItemTypeMap } from '../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useMyColors } from '../../../hooks/useMyColors'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { UserItemDto } from '../../../types/domain/syncro-item/UserItemDto'
import SearchItemImdbSection from '../../SearchPageContent/ItemSearchResults/ImdbSearchItem/SearchItemImdbSection/SearchItemImdbSection'
import FlexCol from '../../_common/flex/FlexCol'
import SyncroItemImage from '../../_common/image/SyncroItemImage/SyncroItemImage'

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

  return (
    <Box>
      <Flex gap={16}>
        <Box onClick={props.onPress}>
          <SyncroItemImage height={120} width={120} item={item} />
        </Box>

        <FlexCol style={{ flexShrink: 1 }}>
          <Text style={{ fontWeight: '500' }}>
            {item.title} {item.year && `(${item.year})`}
          </Text>

          <Flex mt={16}>
            <FlexCol>
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
                  {/* <Text fontWeight="semibold">Them</Text>

                  <HStack space={1}>
                    <VStackHCenter style={{ width: 24 }}>
                      <MaterialCommunityIcons
                        name="star"
                        color={
                          item.ratings?.[0]?.ratingValue
                            ? ratingYellow
                            : theme.colors.gray[500]
                        }
                        size={18}
                        style={{ position: 'relative', top: 2 }}
                      />
                    </VStackHCenter>
                    {item.ratings?.[0]?.ratingValue && (
                      <Text>{item.ratings?.[0]?.ratingValue || ''}</Text>
                    )}
                  </HStack>
                  {item.interests?.[0]?.interestLevel && (
                    <Flex gap={4}>
                      <FlexCol style={{ width: 24 }}>
                        <MaterialCommunityIcons
                          name={
                            item.interests?.[0]?.interestLevel
                              ? 'bookmark-check'
                              : 'bookmark-outline'
                          }
                          color={
                            item.interests?.[0]?.interestLevel
                              ? ratingYellow
                              : theme.colors.gray[500]
                          }
                          size={18}
                        />
                      </FlexCol>
                      <Text>
                        {item.interests?.[0]?.interestLevel && 'Saved'}
                      </Text>
                    </Flex>
                  )} */}
                </>
              )}
            </FlexCol>
            <FlexCol>
              {/* <SearchItemYourSection itemId={item.id} /> */}
            </FlexCol>
          </Flex>
        </FlexCol>
      </Flex>
    </Box>
  )
}

export default UserItem
