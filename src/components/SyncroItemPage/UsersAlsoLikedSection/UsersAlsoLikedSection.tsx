import { Flex, ScrollArea, Switch, Text, Title } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { useMemo } from 'react'
import { useAlsoLikedItemsQuery } from '../../../hooks/react-query/item-recommendation/useAlsoLikedItemsQuery'
import { useMyRatingsQuery } from '../../../hooks/react-query/rating/useMyRatingsQuery'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import { localStorageKeys } from '../../../utils/consts/localStorageKeys'
import HomeRatingItemButtons from '../../HomePage/HomeRatingItem/HomeRatingItemButtons/HomeRatingItemButtons'
import SyncroItemLink from '../../_common/SyncroItemLink/SyncroItemLink'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import SyncroItemImage from '../../_common/image/SyncroItemImage/SyncroItemImage'
import MyPaper from '../../_common/overrides/MyPaper'

type Props = {
  itemId: string
}

const UsersAlsoLikedSection = (props: Props) => {
  const { data: items } = useAlsoLikedItemsQuery(props.itemId)
  const { authUser } = useAuthStore()

  const [hideAlreadySaved, setHideAlreadySaved] = useLocalStorage({
    key: localStorageKeys.itemPage.hideAlreadySaved,
    defaultValue: false,
  })

  const { data: myRatings } = useMyRatingsQuery()

  const visibleItems = useMemo(() => {
    if (!hideAlreadySaved) return items

    return items?.filter((item) =>
      myRatings?.some((r) => r.syncroItemId === item.id) ? false : true
    )
  }, [items, myRatings, hideAlreadySaved])

  if (!items?.length && !visibleItems?.length) return null

  return (
    <FlexCol gap={8} w="100%">
      <FlexVCenter w="100%" justify={'space-between'}>
        <Title order={4}>Users also liked</Title>

        <Switch
          label="Hide items you already saved"
          checked={hideAlreadySaved}
          onChange={(e) => setHideAlreadySaved(e.currentTarget.checked)}
        />
      </FlexVCenter>

      <ScrollArea>
        <Flex
          gap={16}
          sx={{
            paddingBottom: 24,
          }}
        >
          {visibleItems?.map((item) => (
            <MyPaper
              key={item.id}
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
                  <SyncroItemLink item={item} previewWithinPortal>
                    <SyncroItemImage item={item} width={140} />
                  </SyncroItemLink>
                  <SyncroItemLink item={item}>
                    <Text align="center" lineClamp={3} w={140}>
                      {item.title}
                    </Text>
                  </SyncroItemLink>
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
