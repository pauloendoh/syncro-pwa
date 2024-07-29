import { Flex, Select } from '@mantine/core'
import { useIntersection } from '@mantine/hooks'
import { useQueryState } from 'next-usequerystate'
import { useEffect, useMemo, useState } from 'react'
import { useMostRatedItemsQuery } from '../../../hooks/react-query/rating/useMostRatedItemsQuery'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { QueryParams } from '../../../utils/queryParams'
import FavoriteItem from '../../UserProfilePage/FavoritesSection/FavoritesByType/FavoritesByType/FavoriteItem/FavoriteItem'
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

const BrowseItemsExploreSection = ({ ...props }: Props) => {
  const [itemType, setItemType] = useQueryState(QueryParams.type)
  const [period, setPeriod] = useQueryState(QueryParams.period)

  useEffect(() => {
    if (!itemType && !period) {
      setItemType('movie' as SyncroItemType)
      setPeriod('month' as Period)
      return
    }

    if (!itemType) {
      setItemType('movie' as SyncroItemType)
      return
    }

    if (!period) {
      setPeriod('month' as Period)
    }
  }, [itemType, period])

  const { data: items, isLoading } = useMostRatedItemsQuery({
    itemType: itemType as SyncroItemType,
    period: period as Period,
  })

  const { isMobile } = useMyMediaQuery()

  const { entry, ref } = useIntersection()
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (entry?.isIntersecting) {
      setPage((prevPage) => prevPage + 1)
    }
  }, [entry?.isIntersecting])

  useEffect(() => {
    setPage(1)
  }, [itemType, period])

  const showingItems = useMemo(
    () => items?.slice(0, page * 20) || [],
    [items, page]
  )

  if (!itemType || !period) {
    return null
  }

  return (
    <FlexCol gap={16}>
      <FlexVCenter gap={24}>
        <ItemTypeSelector
          value={itemType as SyncroItemType}
          onChange={(newItemType) => {
            setItemType(newItemType)
          }}
          width={120}
          label="Item Type"
        />

        <Select
          label="Most Syncro Entries"
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
        {showingItems.map((item) => (
          <FavoriteItem
            key={item.id}
            item={item}
            alwaysShowTitle
            width={isMobile ? 100 : 160}
            showAvgRating
            showMyRating
          />
        ))}
        <div ref={ref} />
      </Flex>
    </FlexCol>
  )
}

export default BrowseItemsExploreSection
