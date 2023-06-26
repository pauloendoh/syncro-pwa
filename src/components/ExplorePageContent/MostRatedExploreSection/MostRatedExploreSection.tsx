import { Flex, Select } from '@mantine/core'
import { useState } from 'react'
import { useMostRatedItemsQuery } from '../../../hooks/react-query/rating/useMostRatedItemsQuery'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import SyncroItemLink from '../../_common/SyncroItemLink/SyncroItemLink'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import SyncroItemImage from '../../_common/image/SyncroItemImage/SyncroItemImage'
import ItemTypeSelector from './ItemTypeSelector/ItemTypeSelector'

type Props = {}

const periods = [
  {
    value: 'week',
    label: 'This week',
  },
  {
    value: 'month',
    label: 'This month',
  },
  {
    value: 'year',
    label: 'This year',
  },
  {
    value: 'all-time',
    label: 'All time',
  },
] as const
export type Period = (typeof periods)[number]['value']

const MostRatedExploreSection = ({ ...props }: Props) => {
  const [itemType, setItemType] = useState<SyncroItemType>('movie')

  const [period, setPeriod] = useState<Period>('week')

  const { data: items } = useMostRatedItemsQuery({
    itemType,
    period,
  })

  return (
    <FlexCol gap={16}>
      <FlexVCenter gap={24}>
        <ItemTypeSelector
          value={itemType}
          onChange={(newItemType) => {
            setItemType(newItemType)
          }}
          width={120}
        />

        <Select
          w={120}
          data={periods}
          maxDropdownHeight={400}
          value={period}
          onChange={(newPeriod: Period) => {
            setPeriod(newPeriod)
          }}
        />
      </FlexVCenter>

      <Flex wrap="wrap" gap={16}>
        {items?.map((item) => (
          <SyncroItemLink item={item}>
            <SyncroItemImage item={item} width={140} />
          </SyncroItemLink>
        ))}
      </Flex>
    </FlexCol>
  )
}

export default MostRatedExploreSection
