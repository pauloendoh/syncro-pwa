import { Flex, Select } from '@mantine/core'
import { useMemo, useState } from 'react'
import { useQueryParams } from '../../../hooks/useQueryParams'
import { useMySimilarUsersQuery } from '../../../types/domain/me/useMySimilarUsersQuery'
import FlexCol from '../../_common/flex/FlexCol'
import CenterLoader from '../../_common/overrides/CenterLoader/CenterLoader'
import Span from '../../_common/text/Span'
import ItemTypeSelector from '../BrowseItemsExploreSection/ItemTypeSelector/ItemTypeSelector'
import RatingSimilarityItem from './RatingSimilarityItem/RatingSimilarityItem'

type SortBy = 'items count' | 'rating similarity'

const RatingSimilarityList = () => {
  const [queryValue, setQuery] = useQueryParams().itemType

  const { data: ratingSimilarities, isLoading } = useMySimilarUsersQuery(
    queryValue || 'all'
  )

  const [sortBy, setSortBy] = useState<SortBy>('items count')

  const sortedRatingSimilarities = useMemo(() => {
    if (!ratingSimilarities) return []

    if (sortBy === 'items count') {
      return ratingSimilarities.sort((a, b) => {
        if (b.ratedSameItemsCount > a.ratedSameItemsCount) return 1
        return -1
      })
    }
    return ratingSimilarities.sort((a, b) => {
      if (b.overallPercentage > a.overallPercentage) return 1
      return -1
    })
  }, [ratingSimilarities, sortBy])

  return (
    <FlexCol gap={16} maw={480}>
      <Flex gap={16}>
        <ItemTypeSelector
          includeAll
          value={queryValue || 'all'}
          onChange={(value) => {
            setQuery(value, { history: 'replace' })
          }}
          label="Item type"
          width={120}
        />

        <Select
          label="Sort by"
          data={[
            { value: 'items count', label: 'Shared items' },
            { value: 'rating similarity', label: 'Rating similarity' },
          ]}
          value={sortBy}
          onChange={(value: SortBy) => {
            setSortBy(value)
          }}
          w={160}
        />
      </Flex>

      {isLoading && <CenterLoader />}

      {!isLoading && sortedRatingSimilarities.length === 0 && (
        <Span>
          <b>No similar users found.</b> Come back after rating some items!
        </Span>
      )}

      {sortedRatingSimilarities.map((item) => (
        <RatingSimilarityItem key={item.userB.id} item={item} />
      ))}
    </FlexCol>
  )
}

export default RatingSimilarityList
