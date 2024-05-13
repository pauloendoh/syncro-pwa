import { Container, Flex, Title, useMantineTheme } from '@mantine/core'
import { useMemo } from 'react'
import { usePlannedItemsQueryV2 } from '../../hooks/react-query/interest/usePlannedItemsQueryV2'
import { syncroItemTypes } from '../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import MyInfoIcon from '../_common/MyIcons/MyInfoIcon/MyInfoIcon'
import FlexCol from '../_common/flex/FlexCol'
import FlexVCenter from '../_common/flex/FlexVCenter'
import DefaultLayout from '../_common/layout/DefaultLayout'
import Span from '../_common/text/Span'
import GeneralQueueTypeSection from './GeneralQueueTypeSection/GeneralQueueTypeSection'
import GeneralQueueTypeSectionItem from './GeneralQueueTypeSection/GeneralQueueTypeSectionItem/GeneralQueueTypeSectionItem'

type Props = {}

const PlannedAllPage = ({ ...props }: Props) => {
  const { data: plannedItems } = usePlannedItemsQueryV2()

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

  const unqueuedEntriesByType = useMemo(() => {
    const itemsByType = syncroItemTypes.map((type) => ({
      itemType: type,
      entries: sortedRatings
        .filter(
          (rating) =>
            rating.syncroItem?.type === type && rating.queuePosition === null
        )
        .sort((a, b) => {
          if (a.plannedPosition < b.plannedPosition) return -1
          if (a.plannedPosition > b.plannedPosition) return 1

          return 0
        }),
    }))

    return itemsByType.filter((item) => item.entries.length > 0)
  }, [plannedItems])

  const queuedEntries = useMemo(
    () =>
      sortedRatings
        .filter((rating) => rating.queuePosition !== null)
        .sort((a, b) => {
          if (a.queuePosition === null) return 1
          if (b.queuePosition === null) return -1

          if (a.queuePosition < b.queuePosition) return -1
          if (a.queuePosition > b.queuePosition) return 1
          return 0
        }),
    [plannedItems]
  )

  return (
    <DefaultLayout>
      <Container>
        <FlexCol gap={16}>
          <Title order={4}>All Planned Items</Title>

          <Flex gap={24}>
            <div>
              <FlexCol
                w={280}
                p={16}
                bg={theme.colors.dark[5]}
                sx={{
                  borderRadius: 8,
                }}
              >
                <FlexVCenter justify={'space-between'}>
                  <Span weight={'bold'}>General Queue</Span>
                  <MyInfoIcon
                    text="List of items that you plan to consume in the future, regardless of the type of item."
                    useQuestionIconInstead
                  />
                </FlexVCenter>
                <FlexCol gap={8} mt={16}>
                  {queuedEntries.map((entry) => (
                    <GeneralQueueTypeSectionItem
                      key={entry.id}
                      entry={entry}
                      isGeneralQueue
                    />
                  ))}
                </FlexCol>
              </FlexCol>
            </div>

            {unqueuedEntriesByType.map((byType) => (
              <GeneralQueueTypeSection
                key={byType.itemType}
                itemType={byType.itemType}
                entries={byType.entries}
              />
            ))}
          </Flex>
        </FlexCol>
      </Container>
    </DefaultLayout>
  )
}

export default PlannedAllPage
