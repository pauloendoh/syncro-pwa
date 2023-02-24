import { Container, Flex, Text, Title, useMantineTheme } from '@mantine/core'
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

type Props = {}

const SyncroItemPageContent = (props: Props) => {
  const { syncroItemId } = useMyRouterQuery()
  const { data: item } = useSyncroItemDetailsQuery(syncroItemId)
  const isMovieOrSeries = item?.type === 'tvSeries' || item?.type === 'movie'
  const theme = useMantineTheme()

  const itemTypeMap = useSyncroItemTypeMap({
    itemType: item?.type,
  })

  const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)

  return (
    <LoggedLayout>
      <Container mt={40} size="xs">
        <MyPaper>
          {item && (
            <>
              <Title order={3} weight={500}>
                {item.title} {item.year && `(${item.year})`}
              </Title>
              <Flex mt={16} gap={16}>
                <SyncroItemImage item={item} />

                <FlexCol gap={8}>
                  <Flex gap={40}>
                    <FlexVCenter gap={4} sx={{ height: 'fit-content' }}>
                      <MdStarRate
                        color={theme.colors.yellow[5]}
                        size={isSmallScreen ? 16 : 24}
                      />

                      <Text>
                        {item?.avgRating}
                        /10
                      </Text>
                    </FlexVCenter>

                    <Text>
                      {shortNumberFormatter(item?.ratingCount)} votes on{' '}
                      {itemTypeMap.site}
                    </Text>
                  </Flex>

                  <FlexVCenter gap={4}>
                    <SyncroItemIcon type={item.type} size={24} />
                    <Text
                      sx={{
                        position: 'relative',
                        top: 2,
                      }}
                    >
                      {itemTypeMap.getTypeLabel()}
                    </Text>
                  </FlexVCenter>
                </FlexCol>
              </Flex>

              <FlexCol mt={24}>
                <Title order={5} weight={500}>
                  Summary
                </Title>
                <Text mt={8}>{item.plotSummary}</Text>
              </FlexCol>
            </>
          )}
        </MyPaper>
      </Container>

      {/* {isMovieOrSeries && <TrailerSection itemId={syncroItemId!} />} */}
    </LoggedLayout>
  )
}

export default SyncroItemPageContent
