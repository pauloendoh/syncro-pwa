import { Center, Loader, Text } from '@mantine/core'
import { useMemo } from 'react'
import { useSyncroItemTypeMap } from '../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useOverallSearchQuery } from '../../../hooks/react-query/search/useOverallSearchQuery'
import { IImdbResultItem } from '../../../types/domain/movie/MovieResultResponseDto'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import textContainsWords from '../../../utils/text/textContainsWords'
import FlexCol from '../../_common/flex/FlexCol'
import MyPaper from '../../_common/overrides/MyPaper'
import ImdbSearchItem from './ImdbSearchItem/ImdbSearchItem'
import SyncroSearchItem from './SyncroSearchItem/SyncroSearchItem'

type Props = {
  query: string
  type: SyncroItemType
}

const ItemSearchResults = (props: Props) => {
  const typeMap = useSyncroItemTypeMap({
    itemType: props.type,
  })

  const {
    data: searchResultItems,
    isLoading,
    isError,
  } = useOverallSearchQuery(props.query, props.type)

  const noResults = useMemo(
    () => (!isLoading && searchResultItems?.length === 0) || isError,
    [isLoading, searchResultItems]
  )

  const notFoundMessage = useMemo(() => {
    return `No ${typeMap.getTypeLabelLowerCase(true)} found :(`
  }, [props.type])

  // PE 1/3 - remove imdbItems?
  const imdbItems = useMemo(() => {
    if (props.type !== 'movie' && props.type !== 'tvSeries') return []

    if (!searchResultItems) return []
    const items = [...searchResultItems] as IImdbResultItem[]
    return items
  }, [searchResultItems, props.type])

  const otherSyncroItems = useMemo(() => {
    if (
      props.type !== 'game' &&
      props.type !== 'manga' &&
      props.type !== 'book'
    )
      return []

    if (!searchResultItems) return []

    const result = [...searchResultItems] as SyncroItemDto[]
    return result.sort(
      // order the results that contain title first
      (a, b) => {
        if (
          textContainsWords(a.title, props.query) &&
          textContainsWords(b.title, props.query)
        ) {
          return a.ratingCount > b.ratingCount ? -1 : 1
        }

        if (textContainsWords(a.title, props.query)) return -1
        if (textContainsWords(b.title, props.query)) return 1
        return 0
      }
    )
  }, [searchResultItems, props.type, props.query])

  return (
    <MyPaper>
      <FlexCol gap={16}>
        <Text size="lg" weight={500}>
          {typeMap.getTypeLabel(true)}
        </Text>

        {isLoading && (
          <Center
            sx={{
              height: 80,
            }}
          >
            <Loader />
          </Center>
        )}
        {noResults && <Text>{notFoundMessage}</Text>}

        {imdbItems?.map((imdbItem) => (
          <ImdbSearchItem resultItem={imdbItem} key={imdbItem.id} />
        ))}

        {otherSyncroItems?.map((syncroItem) => (
          <SyncroSearchItem item={syncroItem} key={syncroItem.id} />
        ))}

        {/* {items?.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))} */}
      </FlexCol>
    </MyPaper>
  )
}

export default ItemSearchResults
