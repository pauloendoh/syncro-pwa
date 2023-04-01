import { Container, Flex, Select } from '@mantine/core'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { syncroItemOptions } from '../../hooks/domains/syncro-item/syncroItemOptions/syncroItemOptions'
import { useSavedItemsQuery } from '../../hooks/react-query/interest/useSavedItemsQuery'
import { useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import {
  SyncroItemType,
  syncroItemTypes,
} from '../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { urls } from '../../utils/urls'
import FlexVCenter from '../_common/flex/FlexVCenter'
import LoggedLayout from '../_common/layout/LoggedLayout'
import SavedItemsByType from './SavedItemsByType/SavedItemsByType'

//  PE 1/3 - rename
const SavedItemsPage = () => {
  const { data: savedItems } = useSavedItemsQuery()

  const { type } = useMyRouterQuery()

  const groupedSavedItems = useMemo(() => {
    if (!savedItems) return []

    return syncroItemTypes
      .map((t) => ({
        type: t,
        items: savedItems.filter((i) => i.syncroItem?.type === t),
      }))
      .filter((t) => {
        if (String(type) === 'all') return true
        return type === t.type
      })
  }, [savedItems, type])

  const options = useMemo(() => {
    return [
      { value: 'all', label: 'All' },
      ...syncroItemTypes.map((t) => ({
        value: t,
        label:
          syncroItemOptions.find((o) => o.itemType === t)?.getTypeLabel() || '',
      })),
    ]
  }, [])

  const router = useRouter()

  return (
    <LoggedLayout>
      <Container size="sm">
        <FlexVCenter>
          <Select
            label={'Planned items'}
            data={options}
            value={type}
            onChange={(value) => {
              router.push(
                urls.pages.savedItems(value as SyncroItemType | 'all')
              )
              console.log(value)
            }}
          />
        </FlexVCenter>
        <Flex gap={32} mt={24}>
          {groupedSavedItems.map((group) => (
            <SavedItemsByType itemType={group.type} savedItems={group.items} />
          ))}
        </Flex>
      </Container>
    </LoggedLayout>
  )
}

export default SavedItemsPage
