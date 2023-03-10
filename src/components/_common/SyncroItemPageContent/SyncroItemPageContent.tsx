import ShowMoreText from 'react-show-more-text'

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
import { useMediaQuery } from '@mantine/hooks'
import { MdStarRate } from 'react-icons/md'
import { useSyncroItemTypeMap } from '../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useSyncroItemDetailsQuery } from '../../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery'
import { useMyRouterQuery } from '../../../hooks/useMyRouterQuery'
import { shortNumberFormatter } from '../../../utils/math/shortNumberFormatter'
import SyncroItemIcon from '../../HomePageContent/HomeRatingItem/SyncroItemIcon/SyncroItemIcon'
import FlexCol from '../flex/FlexCol'
import FlexVCenter from '../flex/FlexVCenter'
import SyncroItemImage from '../image/SyncroItemImage/SyncroItemImage'
import LoggedLayout from '../layout/LoggedLayout'
import MyPaper from '../overrides/MyPaper'
import ItemRatedBy from './ItemRatedBy/ItemRatedBy'
import MangaPanelsSection from './MangaPanelsSection/MangaPanelsSection'
import RatingRow from './RatingRow/RatingRow'
import TrailerSection from './TrailerSection/TrailerSection'
import UsersAlsoLikedSection from './UsersAlsoLikedSection/UsersAlsoLikedSection'

type Props = {}

const SyncroItemPageContent = (props: Props) => {
  const { syncroItemId } = useMyRouterQuery()
  const { data: item, isLoading } = useSyncroItemDetailsQuery(syncroItemId)
  const canHaveTrailers =
    item?.type === 'tvSeries' || item?.type === 'movie' || item?.type === 'game'
  const theme = useMantineTheme()

  const itemTypeMap = useSyncroItemTypeMap({
    itemType: item?.type,
  })

  const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)

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
              <Title order={3} weight={500}>
                {item.title} {item.year && `[${item.year}]`}
              </Title>
              <Flex mt={16} gap={16}>
                <SyncroItemImage
                  item={item}
                  width={isSmallScreen ? 100 : 160}
                  height={isSmallScreen ? 100 : 160}
                />

                <FlexCol gap={8}>
                  <Flex gap={isSmallScreen ? 24 : 40}>
                    <FlexVCenter gap={4} sx={{ height: 'fit-content' }}>
                      <MdStarRate color={theme.colors.yellow[5]} size={16} />

                      <Text>
                        {item?.avgRating}
                        /10
                      </Text>
                    </FlexVCenter>

                    <Text>
                      {shortNumberFormatter(item?.ratingCount)} votes{' '}
                      {!isSmallScreen && `on ${itemTypeMap.site}`}
                    </Text>
                  </Flex>

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
                  })}
                >
                  {item.plotSummary.length > 0 && (
                    <ShowMoreText lines={5}>{item.plotSummary}</ShowMoreText>
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

        <Box mt={32}>
          <UsersAlsoLikedSection itemId={syncroItemId!} />
        </Box>
      </Container>
    </LoggedLayout>
  )
}

export default SyncroItemPageContent
