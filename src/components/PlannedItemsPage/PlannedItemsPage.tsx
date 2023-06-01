import { Container, Flex, Select } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { syncroItemOptions } from '../../hooks/domains/syncro-item/syncroItemOptions/syncroItemOptions'
import { usePlannedItemsQuery } from '../../hooks/react-query/interest/usePlannedItemsQuery'
import { useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import useAuthStore from '../../hooks/zustand/useAuthStore'
import {
  SyncroItemType,
  syncroItemTypes,
} from '../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { localStorageKeys } from '../../utils/consts/localStorageKeys'
import { urls } from '../../utils/urls'
import FlexVCenter from '../_common/flex/FlexVCenter'
import LoggedLayout from '../_common/layout/LoggedLayout'
import PlannedItemsByType from './PlannedItemsByType/PlannedItemsByType'

const PlannedItemsPage = () => {
  const { authUser } = useAuthStore()
  const { data: savedItems } = usePlannedItemsQuery(authUser?.id)

  const { type } = useMyRouterQuery()
  const router = useRouter()

  const [localType, setLocalType] = useLocalStorage<SyncroItemType>({
    key: localStorageKeys.plannedItemsSelectedType,
  })

  useEffect(() => {
    if (!type && localType) {
      router.replace(urls.pages.savedItems(localType))
      return
    }
  }, [localType])

  useEffect(() => {
    if (type && type !== 'users') {
      setLocalType(type)
    }
  }, [type])

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
      ...syncroItemTypes.map((t) => ({
        value: t,
        label:
          syncroItemOptions.find((o) => o.itemType === t)?.getTypeLabel() || '',
      })),
    ]
  }, [])

  return (
    <LoggedLayout>
      <Container size="sm">
        <FlexVCenter>
          <Select
            label={'Planned items'}
            data={options}
            value={type}
            onChange={(value) => {
              router.push(urls.pages.savedItems(value as SyncroItemType))
            }}
          />
        </FlexVCenter>
        <Flex gap={32} mt={24}>
          {groupedSavedItems.map((group) => (
            <PlannedItemsByType
              itemType={group.type}
              savedItems={group.items}
            />
          ))}
        </Flex>
      </Container>
    </LoggedLayout>
  )
}

export default PlannedItemsPage
