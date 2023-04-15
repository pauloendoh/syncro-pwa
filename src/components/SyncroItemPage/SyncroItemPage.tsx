import {
  Box,
  Center,
  Container,
  Flex,
  Loader,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useState } from 'react'
import LinesEllipsis from 'react-lines-ellipsis'
import { useSyncroItemTypeMap } from '../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useItemReviewQuery } from '../../hooks/react-query/review/useItemReviewQuery'
import { useSyncroItemDetailsQuery } from '../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery'
import { useMyMediaQuery } from '../../hooks/useMyMediaQuery'
import { useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import useAuthStore from '../../hooks/zustand/useAuthStore'
import SyncroItemIcon from '../HomePageContent/HomeRatingItem/SyncroItemIcon/SyncroItemIcon'
import FlexCol from '../_common/flex/FlexCol'
import FlexVCenter from '../_common/flex/FlexVCenter'
import SyncroItemImage from '../_common/image/SyncroItemImage/SyncroItemImage'
import LoggedLayout from '../_common/layout/LoggedLayout'
import MyPaper from '../_common/overrides/MyPaper'
import AvgRatingRow from './AvgRatingRow/AvgRatingRow'
import GenreChips from './GenreChips/GenreChips'
import ItemMoreIconAdmin from './ItemMoreIconAdmin/ItemMoreIconAdmin'
import ItemRatedBy from './ItemRatedBy/ItemRatedBy'
import ItemReviewsSection from './ItemReviewsSection/ItemReviewsSection'
import MangaPanelsSection from './MangaPanelsSection/MangaPanelsSection'
import RatingRow from './RatingRow/RatingRow'
import TrailerSection from './TrailerSection/TrailerSection'
import UsersAlsoLikedSection from './UsersAlsoLikedSection/UsersAlsoLikedSection'

// PE 1/3 - rename
const SyncroItemPage = () => {
  const { syncroItemId } = useMyRouterQuery()
  const { data: item, isLoading } = useSyncroItemDetailsQuery(syncroItemId)
  const canHaveTrailers =
    item?.type === 'tvSeries' || item?.type === 'movie' || item?.type === 'game'
  const theme = useMantineTheme()

  const itemTypeMap = useSyncroItemTypeMap({
    itemType: item?.type,
  })

  const { isMobile } = useMyMediaQuery()

  // PE 1/3 - componentize and move to separate file
  const [canToggleExpand, setCanToggleExpand] = useState(false)
  const [seeMore, setSeeMore] = useState<boolean | null>(null)
  const handleReflow = ({
    clamped,
    text,
  }: {
    clamped: boolean
    text: string
  }) => {
    console.log({
      clamped,
      text,
    })
    if (!item) return

    const isClamped = text.length < item.plotSummary.length

    if (isClamped) {
      setCanToggleExpand(true)
    }
  }

  const { authUser } = useAuthStore()

  const { data: reviews } = useItemReviewQuery(syncroItemId!)

  return (
    <LoggedLayout>
      <Container size="sm">
        <MyPaper>
          {isLoading && (
            <Center sx={{ height: 80 }}>
              <Loader />
            </Center>
          )}

          {item && (
            <>
              <Flex justify={'space-between'}>
                <Title order={3} weight={500}>
                  {item.title} {item.year && `[${item.year}]`}
                </Title>
                {authUser?.isAdmin && <ItemMoreIconAdmin item={item} />}
              </Flex>
              <Flex mt={16} gap={16}>
                <SyncroItemImage
                  item={item}
                  width={isMobile ? 100 : 160}
                  height={isMobile ? 100 : 160}
                />

                <FlexCol gap={8}>
                  <AvgRatingRow item={item} />

                  <FlexVCenter gap={4}>
                    <SyncroItemIcon type={item.type} size={16} />
                    <Text
                      sx={{
                        position: 'relative',
                      }}
                    >
                      {itemTypeMap.getTypeLabel()}
                    </Text>
                  </FlexVCenter>

                  <GenreChips genres={item.genres} />

                  <ItemRatedBy itemId={syncroItemId!} />
                  <FlexVCenter></FlexVCenter>
                </FlexCol>
              </Flex>

              <FlexCol mt={24}>
                <Title order={5} weight={500}>
                  Summary
                </Title>
                <Box
                  mt={8}
                  sx={(theme) => ({
                    a: {
                      color: theme.colors.primary,
                    },
                    '.LinesEllipsis': {
                      // multiline text
                      whiteSpace: 'pre-wrap',
                    },
                  })}
                >
                  {item.plotSummary.length === 0 && (
                    <Text>No summary available</Text>
                  )}
                  {item.plotSummary.length > 0 && (
                    <LinesEllipsis
                      text={item.plotSummary}
                      maxLine={seeMore || seeMore === null ? 3 : 1000}
                      onReflow={handleReflow}
                    />
                  )}
                  {canToggleExpand && (
                    <Box
                      style={{
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        width: 'fit-content',
                        marginTop: 8,
                      }}
                      onClick={() => {
                        if (seeMore === null) {
                          setSeeMore(false)
                        }
                        if (seeMore === true) {
                          setSeeMore(false)
                        }
                        if (seeMore === false) {
                          setSeeMore(true)
                        }
                      }}
                    >
                      {seeMore === null && 'Show more'}
                      {seeMore === true && 'Show more '}
                      {seeMore === false && 'Show less '}
                    </Box>
                  )}
                </Box>
              </FlexCol>

              <Box mt={16} />
              <RatingRow syncroItem={item} />
            </>
          )}
        </MyPaper>

        {canHaveTrailers && (
          <Box mt={24}>
            <TrailerSection itemId={syncroItemId!} />
          </Box>
        )}
        {item?.type === 'manga' && (
          <Box mt={24}>
            <MangaPanelsSection syncroItem={item} />
          </Box>
        )}

        {item && (
          <Box mt={32}>
            <UsersAlsoLikedSection itemId={item.id!} />
          </Box>
        )}
        {reviews && (
          <Box mt={32}>
            <ItemReviewsSection reviews={reviews} />
          </Box>
        )}
      </Container>
    </LoggedLayout>
  )
}

export default SyncroItemPage
