import { Flex, ScrollArea, Text, Title } from '@mantine/core'
import { useAlsoLikedItemsQuery } from '../../../hooks/react-query/item-recommendation/useAlsoLikedItemsQuery'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import { urls } from '../../../utils/urls'
import HomeRatingItemButtons from '../../HomePageContent/HomeRatingItem/HomeRatingItemButtons/HomeRatingItemButtons'
import FlexCol from '../../_common/flex/FlexCol'
import SyncroItemImage from '../../_common/image/SyncroItemImage/SyncroItemImage'
import MyNextLink from '../../_common/overrides/MyNextLink'
import MyPaper from '../../_common/overrides/MyPaper'

type Props = {
  itemId: string
}

const UsersAlsoLikedSection = (props: Props) => {
  const { data: items } = useAlsoLikedItemsQuery(props.itemId)
  const { authUser } = useAuthStore()

  if (!items?.length) return null

  return (
    <FlexCol gap={8}>
      <Title order={3}>Users also liked</Title>

      <ScrollArea>
        <Flex
          gap={16}
          sx={{
            paddingBottom: 24,
          }}
        >
          {items?.map((item) => (
            <MyPaper
              sx={{
                padding: 16,
              }}
            >
              <FlexCol
                align="center"
                justify={'space-between'}
                h="100%"
                gap={24}
              >
                <FlexCol align="center" gap={8}>
                  <MyNextLink href={urls.pages.syncroItem(item.id)}>
                    <SyncroItemImage item={item} width={140} />
                  </MyNextLink>
                  <MyNextLink href={urls.pages.syncroItem(item.id)}>
                    <Text align="center" lineClamp={3}>
                      {item.title}
                    </Text>
                  </MyNextLink>
                </FlexCol>

                {authUser && (
                  <HomeRatingItemButtons
                    syncroItemId={item.id}
                    gap={16}
                    hideMoreMenu
                  />
                )}
              </FlexCol>
            </MyPaper>
          ))}
        </Flex>
      </ScrollArea>
    </FlexCol>
  )
}

export default UsersAlsoLikedSection
