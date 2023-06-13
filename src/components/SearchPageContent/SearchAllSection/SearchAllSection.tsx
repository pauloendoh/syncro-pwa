import { useSearchAllQuery } from '../../../hooks/react-query/search/useSearchAllQuery'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import FlexCol from '../../_common/flex/FlexCol'
import CenterLoader from '../../_common/overrides/CenterLoader/CenterLoader'
import SearchAllSectionTypeItem from './SearchAllSectionTypeItem/SearchAllSectionTypeItem'

type Props = {
  q: string
}

const SearchAllSection = (props: Props) => {
  const { data, isLoading } = useSearchAllQuery(props.q)

  if (isLoading || !data) return <CenterLoader />

  return (
    <FlexCol gap={24}>
      {
        // for each key value
        // render a section

        Object.entries(data).map(([key, value]) => {
          if (key === 'users') return null

          return (
            <SearchAllSectionTypeItem
              key={key}
              q={props.q}
              items={value as SyncroItemDto[]}
              type={key as SyncroItemType}
            />
          )
        })
      }
    </FlexCol>
  )
}

export default SearchAllSection
