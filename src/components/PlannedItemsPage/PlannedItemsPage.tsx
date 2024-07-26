import { Container, Flex, Title } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import useAuthStore from '../../hooks/zustand/useAuthStore'
import {
  SyncroItemType,
  syncroItemTypes,
} from '../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { localStorageKeys } from '../../utils/consts/localStorageKeys'
import { urls } from '../../utils/urls/urls'
import GridPlannedItemsV2 from '../HomePage/PlannedItemsHomeSection/GridPlannedItemsV2/GridPlannedItemsV2'
import PlannedItemTypeButton from '../HomePage/PlannedItemsHomeSection/PlannedItemTypeButton/PlannedItemTypeButton'
import PlannedItemsMoreMenu from '../HomePage/PlannedItemsHomeSection/PlannedItemsMoreMenu/PlannedItemsMoreMenu'
import { usePlannedSectionUtils } from '../HomePage/PlannedItemsHomeSection/usePlannedSectionUtils/usePlannedSectionUtils'
import { isSyncroItemType } from '../SearchPageContent/isSyncroItemType/isSyncroItemType'
import FlexVCenter from '../_common/flex/FlexVCenter'
import DefaultLayout from '../_common/layout/DefaultLayout'

const PlannedItemsPage = () => {
  const { getAuthUserId } = useAuthStore()

  const { selectedStatus, setSelectedStatus, ratings, title } =
    usePlannedSectionUtils({ userId: getAuthUserId() })

  const { type } = useMyRouterQuery()
  const router = useRouter()

  const [localType, setLocalType] = useLocalStorage<SyncroItemType>({
    key: localStorageKeys.plannedItemsSelectedType,
  })

  useEffect(() => {
    if (!type && localType) {
      router.replace(urls.pages.savedItems(localType))
    }
  }, [localType])

  useEffect(() => {
    if (isSyncroItemType(type)) {
      setLocalType(type)
    }
  }, [type])

  return (
    <DefaultLayout>
      <Container size="sm">
        <FlexVCenter justify={'space-between'}>
          <Title size="lg">{title}</Title>
          <PlannedItemsMoreMenu
            selectedStatus={selectedStatus}
            onChangeStatus={setSelectedStatus}
          />
        </FlexVCenter>
        <FlexVCenter mt={16}>
          <FlexVCenter gap={8} wrap="wrap">
            {syncroItemTypes.map((t) => (
              <PlannedItemTypeButton
                selectedStatus={selectedStatus}
                userId={getAuthUserId()}
                key={t}
                type={t}
                isSelected={t === type}
                onClick={() => {
                  router.push(urls.pages.savedItems(t))
                }}
              />
            ))}
          </FlexVCenter>
        </FlexVCenter>
        <Flex gap={32} mt={24}>
          <GridPlannedItemsV2
            ratings={ratings || []}
            selectedType={localType}
          />
        </Flex>
      </Container>
    </DefaultLayout>
  )
}

export default PlannedItemsPage
