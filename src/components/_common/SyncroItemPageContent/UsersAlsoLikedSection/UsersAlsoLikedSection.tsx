import { Flex, ScrollArea, Text, Title } from '@mantine/core'
import { useAlsoLikedItemsQuery } from '../../../../hooks/react-query/item-recommendation/useAlsoLikedItemsQuery'
import { urls } from '../../../../utils/urls'
import HomeRatingItemButtons from '../../../HomePageContent/HomeRatingItem/HomeRatingItemButtons/HomeRatingItemButtons'
import FlexCol from '../../flex/FlexCol'
import SyncroItemImage from '../../image/SyncroItemImage/SyncroItemImage'
import MyNextLink from '../../overrides/MyNextLink'
import MyPaper from '../../overrides/MyPaper'

type Props = {
  itemId: string
}

const UsersAlsoLikedSection = (props: Props) => {
  const { data: items } = useAlsoLikedItemsQuery(props.itemId)

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
                padding: 8,
              }}
              w={180}
            >
              <FlexCol
                align="center"
                justify={'space-between'}
                h="100%"
                gap={24}
              >
                <FlexCol align="center" gap={8}>
                  <MyNextLink href={urls.pages.syncroItem(item.id)}>
                    <SyncroItemImage item={item} height={160} width={160} />
                  </MyNextLink>
                  <MyNextLink href={urls.pages.syncroItem(item.id)}>
                    <Text align="center" lineClamp={3}>
                      {item.title}
                    </Text>
                  </MyNextLink>
                </FlexCol>

                <HomeRatingItemButtons syncroItemId={item.id} gap={16} />
              </FlexCol>
            </MyPaper>
          ))}
        </Flex>
      </ScrollArea>
    </FlexCol>
  )
}

export default UsersAlsoLikedSection
