import { Box, Flex, Text, Title } from '@mantine/core'
import { useSyncroItemTypeMap } from '../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useSyncroItemDetailsQuery } from '../../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { getItemTitleAndYear } from '../../../utils/domains/syncro-item/getItemTitleAndYear'
import { urls } from '../../../utils/urls'
import SyncroItemIcon from '../../HomePage/HomeRatingItem/SyncroItemIcon/SyncroItemIcon'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import CenterLoader from '../../_common/overrides/CenterLoader/CenterLoader'
import MyNextLink from '../../_common/overrides/MyNextLink'
import AvgRatingRow from '../AvgRatingRow/AvgRatingRow'
import GenreChips from '../GenreChips/GenreChips'
import ImageSyncroItemPage from '../ImageSyncroItemPage/ImageSyncroItemPage'
import ImdbExtraInfoSection from '../ImdbExtraInfoSection/ImdbExtraInfoSection'
import ItemMoreIconAdmin from '../ItemMoreIconAdmin/ItemMoreIconAdmin'
import ItemRatedBy from '../ItemRatedBy/ItemRatedBy'
import RatingRow from '../RatingRow/RatingRow'
import SyncroItemSummarySection from '../SyncroItemSummarySection/SyncroItemSummarySection'

type Props = {
  initialData: SyncroItemDto | null
  syncroItemId: string
  titleIsLink?: boolean
}

const SyncroItemPaperContent = (props: Props) => {
  const { syncroItemId } = props
  const { data: item, isLoading } = useSyncroItemDetailsQuery(syncroItemId, {
    initialData: props.initialData || undefined,
  })

  const { authUser } = useAuthStore()

  const { isMobile } = useMyMediaQuery()

  const itemTypeMap = useSyncroItemTypeMap({
    itemType: item?.type,
  })

  return (
    <>
      {isLoading && <CenterLoader />}

      {item && (
        <>
          <Flex justify={'space-between'}>
            {props.titleIsLink ? (
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

            {authUser?.isAdmin && <ItemMoreIconAdmin item={item} />}
          </Flex>
          <Flex mt={16} gap={16}>
            <ImageSyncroItemPage
              isMobile={isMobile}
              item={item}
              isLinkInstead={props.titleIsLink}
            />

            <FlexCol gap={8}>
              <AvgRatingRow item={item} />

              <FlexVCenter gap={4}>
                <SyncroItemIcon type={item.type} size={16} />
                <Text
                  sx={{
                    position: 'relative',
                  }}
                >
                  {itemTypeMap.getTypeLabel()}
                </Text>
              </FlexVCenter>

              <GenreChips genres={item.genres} />

              <ItemRatedBy itemId={syncroItemId!} />
            </FlexCol>
          </Flex>

          <Box mt={24}>
            <SyncroItemSummarySection item={item} />
          </Box>

          {item.imdbExtraInfo && (
            <Box mt={24}>
              <ImdbExtraInfoSection item={item} />
            </Box>
          )}

          <Box mt={16} />
          <RatingRow syncroItem={item} />
        </>
      )}
    </>
  )
}

export default SyncroItemPaperContent
