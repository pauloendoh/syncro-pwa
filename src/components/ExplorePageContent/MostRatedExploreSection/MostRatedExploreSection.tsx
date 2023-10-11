import { Flex, Select } from '@mantine/core'
import { useState } from 'react'
import { useMostRatedItemsQuery } from '../../../hooks/react-query/rating/useMostRatedItemsQuery'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import FavoriteItem from '../../UserProfilePage/FavoritesSection/FavoritesByType/FavoritesByType/FavoriteItem/FavoriteItem'
import SyncroItemLink from '../../_common/SyncroItemLink/SyncroItemLink'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import CenterLoader from '../../_common/overrides/CenterLoader/CenterLoader'
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

  const [period, setPeriod] = useState<Period>('month')

  const { data: items, isLoading } = useMostRatedItemsQuery({
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
          w={128}
          data={periods}
          maxDropdownHeight={400}
          value={period}
          onChange={(newPeriod: Period) => {
            setPeriod(newPeriod)
          }}
        />
      </FlexVCenter>

      {isLoading && <CenterLoader />}

      {!isLoading && items?.length === 0 && <div>No items found</div>}

      <Flex wrap="wrap" gap={16}>
        {items?.map((item) => (
          <SyncroItemLink item={item}>
            <FavoriteItem
              item={item}
              alwaysShowTitle
              width={140}
              showAvgRating
              showMyRating
            />
          </SyncroItemLink>
        ))}
      </Flex>
    </FlexCol>
  )
}

export default MostRatedExploreSection
