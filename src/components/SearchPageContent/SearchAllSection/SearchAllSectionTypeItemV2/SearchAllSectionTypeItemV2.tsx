import { Box, Flex, ScrollArea, Title, useMantineTheme } from '@mantine/core'
import { MdArrowRight } from 'react-icons/md'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useSearchByTypeQuery } from '../../../../hooks/react-query/search/useSearchByTypeQuery'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { urls } from '../../../../utils/urls/urls'
import FlexCol from '../../../_common/flex/FlexCol'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import CenterLoader from '../../../_common/overrides/CenterLoader/CenterLoader'
import MyNextLink from '../../../_common/overrides/MyNextLink'
import Span from '../../../_common/text/Span'
import ItemSavedByPreloaded from '../../../SyncroItemPage/ItemSavedBy/ItemSavedByPreloaded/ItemSavedByPreloaded'
import FavoriteItem from '../../../UserProfilePage/FavoritesSection/FavoritesByType/FavoritesByType/FavoriteItem/FavoriteItem'

type Props = {
  q: string
  type: SyncroItemType
}

const SearchAllSectionTypeItemV2 = (props: Props) => {
  const { data: searchResults, isLoading } = useSearchByTypeQuery(
    props.q,
    props.type,
    {
      refetchOnWindowFocus: false,
    }
  )

  const map = useSyncroItemTypeMap({
    itemType: props.type,
  })

  const theme = useMantineTheme()

  const { isMobile } = useMyMediaQuery()

  return (
    <FlexCol key={props.type} gap={8}>
      <FlexVCenter justify={'space-between'}>
        <FlexVCenter gap={8}>
          <Box
            sx={{
              width: 4,
              borderRadius: 1,
              height: 24,
              background: theme.colors.secondary[9],
            }}
          />
          <Title order={4}>{map?.getTypeLabel(true)}</Title>
        </FlexVCenter>

        <MyNextLink
          href={urls.pages.search({
            q: props.q,
            type: props.type,
          })}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            color: theme.colors.dark[2],
          }}
        >
          <Span
            sx={{
              color: theme.colors.dark[2],
              ':hover': {
                color: theme.colors.dark[1],
                textDecoration: 'underline',
              },
            }}
          >
            See all
          </Span>
          <MdArrowRight />
        </MyNextLink>
      </FlexVCenter>
      <ScrollArea
        h={208}
        styles={{
          root: isLoading
            ? {
                borderRadius: 8,
                border: `1px solid ${theme.colors.dark[5]}`,
              }
            : undefined,
        }}
      >
        <Flex gap={8}>
          {isLoading && <CenterLoader height={180} />}
          {!isLoading && !searchResults?.length && (
            <Span>No results found</Span>
          )}
          {!isLoading &&
            !!searchResults?.length &&
            searchResults.slice(0, 8).map((result) => (
              <FlexCol key={result.item.id}>
                <FavoriteItem
                  key={result.item.id}
                  item={result.item}
                  width={isMobile ? 104 : 116}
                  alwaysShowTitle
                  showAvgRating
                  showMyRating
                />
                <ItemSavedByPreloaded
                  itemId={result.item.id}
                  ratings={result.ratingsByFollowingUsers.slice(0, 3)}
                />
              </FlexCol>
            ))}
        </Flex>
      </ScrollArea>
    </FlexCol>
  )
}

export default SearchAllSectionTypeItemV2
