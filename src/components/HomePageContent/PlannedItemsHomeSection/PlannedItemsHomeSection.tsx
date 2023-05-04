import { ScrollArea, Title } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { useSavedItemsQuery } from '../../../hooks/react-query/interest/useSavedItemsQuery'
import {
  SyncroItemType,
  syncroItemTypes,
} from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { localStorageKeys } from '../../../utils/consts/localStorageKeys'
import { urls } from '../../../utils/urls'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import MyNextLink from '../../_common/overrides/MyNextLink'
import MyPaper from '../../_common/overrides/MyPaper'
import DragDropPlannedItems from './DragDropPlannedItems/DragDropPlannedItems'
import PlannedItemButton from './PlannedItemButton/PlannedItemButton'

type Props = {}

const PlannedItemsHomeSection = (props: Props) => {
  const [selectedType, setSelectedType] = useLocalStorage<SyncroItemType>({
    key: localStorageKeys.plannedItemsSelectedType,
  })
  const { data: savedItems } = useSavedItemsQuery()

  if (!savedItems || savedItems.length === 0) return null

  return (
    <FlexCol
      gap={16}
      sx={{
        maxWidth: 400,
        justifyContent: 'flex-start',
      }}
    >
      <FlexVCenter justify={'space-between'}>
        <FlexVCenter gap={4}>
          <Title order={5}>Planned items</Title>
        </FlexVCenter>

        <MyNextLink href={urls.pages.savedItems()}>
          <Title order={5} underline>
            See all
          </Title>
        </MyNextLink>
      </FlexVCenter>

      <MyPaper
        sx={{
          padding: 0,
        }}
      >
        <FlexCol>
          <FlexVCenter gap={8} wrap="wrap" p={16}>
            {syncroItemTypes.map((type) => (
              <PlannedItemButton
                key={type}
                type={type}
                isSelected={type === selectedType}
                onClick={() => setSelectedType(type)}
              />
            ))}
          </FlexVCenter>

          <ScrollArea
            type="never"
            sx={{ paddingRight: 16, paddingLeft: 16, paddingBottom: 8 }}
          >
            <DragDropPlannedItems itemType={selectedType} />
          </ScrollArea>
        </FlexCol>
      </MyPaper>
    </FlexCol>
  )
}

export default PlannedItemsHomeSection
