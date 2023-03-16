import { ScrollArea, Title } from '@mantine/core'
import { useMemo, useState } from 'react'
import { MdBookmark } from 'react-icons/md'
import { useSavedItemsQuery } from '../../../hooks/react-query/interest/useSavedItemsQuery'
import {
  SyncroItemType,
  syncroItemTypes,
} from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { urls } from '../../../utils/urls'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import MyNextLink from '../../_common/overrides/MyNextLink'
import MyPaper from '../../_common/overrides/MyPaper'
import PlannedItem from './PlannedItem/PlannedItem'
import PlannedItemButton from './PlannedItemButton/PlannedItemButton'

type Props = {}

const PlannedItemsHomeSection = (props: Props) => {
  const [selectedType, setSelectedType] = useState<SyncroItemType>('movie')
  const { data: savedItems } = useSavedItemsQuery()

  const sortedPlanned = useMemo(() => {
    return (
      savedItems
        ?.filter((d) => d.syncroItem?.type === selectedType)
        ?.sort((a, b) => a.position - b.position) || []
    )
  }, [selectedType, savedItems])

  return (
    <FlexCol gap={16}>
      <FlexVCenter justify={'space-between'}>
        <FlexVCenter gap={4}>
          <MdBookmark size={24} />
          <Title order={5}>Planned items</Title>
        </FlexVCenter>

        <MyNextLink href={urls.pages.savedItems('all')}>
          <Title order={5} underline>
            See all
          </Title>
        </MyNextLink>
      </FlexVCenter>

      <MyPaper>
        <FlexCol gap={16}>
          <ScrollArea>
            <FlexVCenter gap={16} pb={16}>
              {syncroItemTypes.map((type) => (
                <PlannedItemButton
                  key={type}
                  type={type}
                  isSelected={type === selectedType}
                  onClick={() => setSelectedType(type)}
                />
              ))}
            </FlexVCenter>
          </ScrollArea>

          <FlexCol>
            {sortedPlanned.map((planned) => (
              <PlannedItem key={planned.syncroItem?.id} planned={planned} />
            ))}
          </FlexCol>
        </FlexCol>
      </MyPaper>
    </FlexCol>
  )
}

export default PlannedItemsHomeSection
