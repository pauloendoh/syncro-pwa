import { Center, Loader, Text } from '@mantine/core'
import { useMemo } from 'react'
import { SyncroItemType } from '../../../domains/syncro-item/SyncroItemType'
import { useSyncroItemTypeMap } from '../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useOverallSearchQuery } from '../../../hooks/react-query/search/useOverallSearchQuery'
import { SyncroItemDto } from '../../../hooks/react-query/syncro-item/SyncroItemDto'
import { IImdbResultItem } from '../../../types/domains/imdb/IImdbResultItem'
import FlexCol from '../../_common/flex/FlexCol'
import MyPaper from '../../_common/overrides/MyPaper'
import ImdbSearchItem from './ImdbSearchItem/ImdbSearchItem'

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
    if (props.type !== 'game' && props.type !== 'manga') return []

    if (!searchResultItems) return []

    return [...searchResultItems] as SyncroItemDto[]
  }, [searchResultItems, props.type])

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

        {/* {otherSyncroItems?.map((syncroItem) => (
    <SyncroSearchItem
      syncroItem={syncroItem}
      key={syncroItem.id}
      onClick={() => onClickItemId(syncroItem.id)}
    />
  ))}


        {items?.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))} */}
      </FlexCol>
    </MyPaper>
  )
}

export default ItemSearchResults
