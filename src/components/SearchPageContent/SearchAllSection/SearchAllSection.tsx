import { useSearchAllQuery } from '../../../hooks/react-query/search/useSearchAllQuery'
import { SearchType } from '../../../types/domain/search/SearchParams'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import FlexCol from '../../_common/flex/FlexCol'
import CenterLoader from '../../_common/overrides/CenterLoader/CenterLoader'
import SearchAllSectionTypeItem from './SearchAllSectionTypeItem/SearchAllSectionTypeItem'
import SearchAllUsersSection from './SearchAllUsersSection/SearchAllUsersSection'

type Props = {
  q: string
}

const SearchAllSection = (props: Props) => {
  const { data, isLoading, isError } = useSearchAllQuery(props.q, {
    refetchOnWindowFocus: false,
  })

  if (isLoading) return <CenterLoader />

  if (isError) return <div>Error. Please, contact support.</div>

  if (!data) {
    return <div>No data</div>
  }

  return (
    <FlexCol gap={40}>
      {!!data.users.length && (
        <SearchAllUsersSection users={data.users} query={props.q} />
      )}

      {
        // for each key value
        // render a section

        Object.entries(data).map(([key, value]) => {
          const invalidTypes = ['users', 'book', 'music'] as SearchType[]
          if (invalidTypes.includes(key as SearchType)) {
            return null
          }

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
