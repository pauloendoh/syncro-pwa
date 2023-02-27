import { Container } from '@mantine/core'
import { useMemo } from 'react'
import { useSavedItemsQuery } from '../../hooks/react-query/interest/useSavedItemsQuery'
import { syncroItemTypes } from '../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import FlexCol from '../_common/flex/FlexCol'
import LoggedLayout from '../_common/layout/LoggedLayout'
import SavedItemsByType from './SavedItemsByType/SavedItemsByType'

type Props = {}

const SavedItemsPageContent = (props: Props) => {
  const { data: savedItems, refetch, isLoading } = useSavedItemsQuery()

  const groupedSavedItems = useMemo(() => {
    if (!savedItems) return []

    return syncroItemTypes.map((t) => ({
      type: t,
      items: savedItems.filter((i) => i.syncroItem?.type === t),
    }))
    // .sort(
    //   // sort by number of items descending
    //   (a, b) => (a.items.length > b.items.length ? -1 : 1)
    // )
  }, [savedItems])

  return (
    <LoggedLayout>
      <Container size="sm">
        <FlexCol gap={32}>
          {groupedSavedItems.map((group) => (
            <SavedItemsByType itemType={group.type} savedItems={group.items} />
          ))}
        </FlexCol>
      </Container>
    </LoggedLayout>
  )
}

export default SavedItemsPageContent
