import { Center, Container, Flex, Title, useMantineTheme } from '@mantine/core'
import { useMemo } from 'react'
import { usePlannedItemsQueryV2 } from '../../hooks/react-query/interest/usePlannedItemsQueryV2'
import useAuthStore from '../../hooks/zustand/useAuthStore'
import SyncroItemIcon from '../HomePage/HomeRatingItem/SyncroItemIcon/SyncroItemIcon'
import FavoriteItem from '../UserProfilePage/FavoritesSection/FavoritesByType/FavoritesByType/FavoriteItem/FavoriteItem'
import FlexCol from '../_common/flex/FlexCol'
import LoggedLayout from '../_common/layout/LoggedLayout'

type Props = {}

const PlannedAllPage = ({ ...props }: Props) => {
  const { authUser } = useAuthStore()
  const { data: plannedItems } = usePlannedItemsQueryV2(authUser?.id)

  const sortedRatings = useMemo(
    () =>
      plannedItems
        ?.sort((a, b) => {
          // createdAt asc
          if (a.createdAt < b.createdAt) return -1
          if (a.createdAt > b.createdAt) return 1
          return 0
        })
        ?.filter((rating) => {
          if (
            rating.syncroItem?.type === 'book' ||
            rating.syncroItem?.type === 'goodreadsBook'
          )
            return false
          return true
        }) || [],
    [plannedItems]
  )

  const theme = useMantineTheme()

  return (
    <LoggedLayout>
      <Container>
        <FlexCol>
          <Title order={4}>Planned</Title>
          <Flex wrap={'wrap'} gap={8}>
            {sortedRatings.map((rating) => (
              <div
                key={rating.id}
                style={{
                  position: 'relative',
                }}
              >
                <FavoriteItem item={rating.syncroItem!} width={140} />
                <Center
                  pos="absolute"
                  right={2}
                  bottom={2}
                  title={rating.syncroItem?.type}
                  sx={{
                    backgroundColor: theme.colors.gray[9],
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                  }}
                >
                  <SyncroItemIcon type={rating.syncroItem!.type} size={16} />
                </Center>
              </div>
            ))}
          </Flex>
        </FlexCol>
      </Container>
    </LoggedLayout>
  )
}

export default PlannedAllPage
