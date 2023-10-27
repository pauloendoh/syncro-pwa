import { Box, Flex, Skeleton, Title } from '@mantine/core'
import { useSyncroItemDetailsQuery } from '../../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { getItemTitleAndYear } from '../../../utils/domains/syncro-item/getItemTitleAndYear'
import { urls } from '../../../utils/urls/urls'
import CenterLoader from '../../_common/overrides/CenterLoader/CenterLoader'
import MyNextLink from '../../_common/overrides/MyNextLink'
import ImageSyncroItemPage from '../ImageSyncroItemPage/ImageSyncroItemPage'
import ImdbExtraInfoSection from '../ImdbExtraInfoSection/ImdbExtraInfoSection'
import ItemMoreIcon from '../ItemMoreIcon/ItemMoreIcon'
import RatingRow from '../RatingRow/RatingRow'
import SyncroItemSummarySection from '../SyncroItemSummarySection/SyncroItemSummarySection'
import SyncroItemMainInfosSection from './SyncroItemMainInfosSection/SyncroItemMainInfosSection'

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

  return (
    <Box>
      {isLoading && <CenterLoader />}

      {item && (
        <Box>
          <Flex justify={'space-between'}>
            {props.isPreview ? (
              <MyNextLink href={urls.pages.syncroItem(encodeURI(item.id!))}>
                <Title
                  order={4}
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
          <Flex mt={props.isPreview ? 8 : 16} gap={isMobile ? 12 : 16}>
            <ImageSyncroItemPage
              isMobile={isMobile}
              item={item}
              isPreview={props.isPreview}
            />

            <SyncroItemMainInfosSection
              isPreview={props.isPreview}
              item={item}
            />
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
