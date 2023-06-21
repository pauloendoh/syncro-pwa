import { Box, Flex, Title, useMantineTheme } from '@mantine/core'
import { MdArrowRight } from 'react-icons/md'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { urls } from '../../../../utils/urls'
import FavoriteItem from '../../../UserProfilePage/FavoritesSection/FavoritesByType/FavoritesByType/FavoriteItem/FavoriteItem'
import FlexCol from '../../../_common/flex/FlexCol'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import MyNextLink from '../../../_common/overrides/MyNextLink'
import Span from '../../../_common/text/Span'

type Props = {
  q: string
  type: SyncroItemType
  items: SyncroItemDto[]
}

const SearchAllSectionTypeItem = (props: Props) => {
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
          <Title order={4}>
            {map?.getTypeLabel(true)}
            {/* <MyNextLink
          href={urls.pages.search({
            q: props.q,
            type: props.type,
          })}
          style={{
            fontSize: 14,
            fontWeight: 400,
            marginLeft: 8,
          }}
        >
          <MyTextLink>See all</MyTextLink>
        </MyNextLink> */}
          </Title>
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

      {/* <FlexCol gap={8}>
        {props.items.slice(0, 2).map((item) => (
          <SyncroSearchItem key={item.id} item={item} />
        ))}
      </FlexCol> */}
      {/* <Carousel
        height={props.type === 'book' ? 180 : 168}
        slideGap={'xs'}
        withControls={true}
        controlsOffset={20}
        withIndicators
        styles={{
          control: {
            opacity: 0.8,
            '&[data-inactive]': {
              opacity: 0,
              cursor: 'default',
            },
          },
        }}
      >
        {props.items.slice(0, 8).map((item) => (
          <Carousel.Slide key={item.id}>
            <SyncroSearchItem item={item} previewWithinPortal />
          </Carousel.Slide>
        ))}
      </Carousel> */}
      {!!props.items.length && (
        <Flex
          gap={8}
          wrap="wrap"
          sx={{
            border: isMobile ? 'none' : '1px solid ' + theme.colors.dark[5],
            borderRadius: 4,
            padding: isMobile ? 0 : 8,
          }}
        >
          {props.items.slice(0, 8).map((item) => (
            <FavoriteItem
              key={item.id}
              item={item}
              width={isMobile ? 104 : 116}
              alwaysShowTitle
            />
          ))}
        </Flex>
      )}
    </FlexCol>
  )
}

export default SearchAllSectionTypeItem
