import { Box, Flex, Skeleton, Title } from '@mantine/core'
import { useSyncroItemTypeMap } from '../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useSyncroItemDetailsQuery } from '../../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { getItemTitleAndYear } from '../../../utils/domains/syncro-item/getItemTitleAndYear'
import { urls } from '../../../utils/urls'
import SyncroItemIcon from '../../HomePage/HomeRatingItem/SyncroItemIcon/SyncroItemIcon'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import CenterLoader from '../../_common/overrides/CenterLoader/CenterLoader'
import MyNextLink from '../../_common/overrides/MyNextLink'
import Span from '../../_common/text/Span'
import AvgRatingRow from '../AvgRatingRow/AvgRatingRow'
import GenresSection from '../GenresSection/GenresSection'
import ImageSyncroItemPage from '../ImageSyncroItemPage/ImageSyncroItemPage'
import ImdbExtraInfoSection from '../ImdbExtraInfoSection/ImdbExtraInfoSection'
import ItemMoreIcon from '../ItemMoreIcon/ItemMoreIcon'
import ItemRatedBy from '../ItemRatedBy/ItemRatedBy'
import RatingRow from '../RatingRow/RatingRow'
import SyncroItemSummarySection from '../SyncroItemSummarySection/SyncroItemSummarySection'

type Props = {
  initialData: SyncroItemDto | null
  syncroItemId: string
  isPreview?: boolean
}

const SyncroItemPaperContent = (props: Props) => {
  const { syncroItemId } = props
  const { data: item, isLoading } = useSyncroItemDetailsQuery(syncroItemId, {
    initialData: props.initialData || undefined,
  })

  const { isMobile } = useMyMediaQuery()

  const itemTypeMap = useSyncroItemTypeMap({
    itemType: item?.type,
  })

  return (
    <Box>
      {isLoading && <CenterLoader />}

      {item && (
        <Box>
          <Flex justify={'space-between'}>
            {props.isPreview ? (
              <MyNextLink href={urls.pages.syncroItem(encodeURI(item.id!))}>
                <Title
                  order={3}
                  weight={500}
                  sx={{
                    ':hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {getItemTitleAndYear(item)}
                </Title>
              </MyNextLink>
            ) : (
              <Title order={3} weight={500}>
                {getItemTitleAndYear(item)}
              </Title>
            )}

            <ItemMoreIcon item={item} />
          </Flex>
          <Flex mt={16} gap={16}>
            <ImageSyncroItemPage
              isMobile={isMobile}
              item={item}
              isPreview={props.isPreview}
            />

            <FlexCol gap={8}>
              <AvgRatingRow item={item} isPreview={props.isPreview} />

              <FlexVCenter gap={4}>
                <SyncroItemIcon type={item.type} size={16} />
                <MyNextLink
                  href={urls.pages.explore('most-rated', {
                    type: item.type,
                  })}
                >
                  <Span
                    sx={{
                      ':hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {itemTypeMap.getTypeLabel()}
                  </Span>
                </MyNextLink>
              </FlexVCenter>

              <GenresSection genres={item.genres} isPreview={props.isPreview} />

              <ItemRatedBy itemId={syncroItemId!} />
            </FlexCol>
          </Flex>

          <Box mt={24}>
            {item.type !== 'music' && (
              <SyncroItemSummarySection
                isPreview={props.isPreview}
                item={item}
              />
            )}
          </Box>

          {(item.type === 'tvSeries' || item.type === 'movie') &&
            !item.imdbExtraInfo && (
              <Box mt={24}>
                <Skeleton h={24} />
              </Box>
            )}

          {item.imdbExtraInfo && (
            <Box mt={24}>
              <ImdbExtraInfoSection item={item} />
            </Box>
          )}

          <Box mt={16} />
          <RatingRow syncroItem={item} isPreview={props.isPreview} />
        </Box>
      )}
    </Box>
  )
}

export default SyncroItemPaperContent
