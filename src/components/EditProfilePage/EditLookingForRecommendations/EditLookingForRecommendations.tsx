import { Box, Checkbox, Flex, Text } from '@mantine/core'
import { pushOrRemove } from 'endoh-utils'
import { syncroItemOptions } from '../../../hooks/domains/syncro-item/syncroItemOptions/syncroItemOptions'
import {
  SyncroItemType,
  syncroItemTypes,
} from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

type Props = {
  selectedTypes: SyncroItemType[]
  onChange: (types: SyncroItemType[]) => void
}

const EditLookingForRecommendations = (props: Props) => {
  return (
    <Box>
      <Text>Looking for recommendations:</Text>

      <Flex gap={24} mt={8} wrap="wrap">
        {syncroItemTypes.map((type) => (
          <Checkbox
            styles={{
              label: {
                cursor: 'pointer',
              },

              input: {
                cursor: 'pointer',
              },
            }}
            checked={
              props.selectedTypes?.find(
                (selectedType) => selectedType === type
              ) !== undefined
            }
            onChange={(e) => {
              const curr = props.selectedTypes || []

              const newCurr = pushOrRemove(curr, type)
              props.onChange(newCurr)
            }}
            label={syncroItemOptions
              .find((option) => option.itemType === type)
              ?.getTypeLabel()}
          />
        ))}
      </Flex>
    </Box>
  )
}

export default EditLookingForRecommendations
