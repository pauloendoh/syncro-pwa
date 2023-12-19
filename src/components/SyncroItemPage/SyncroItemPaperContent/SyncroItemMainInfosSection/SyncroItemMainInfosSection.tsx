import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'
import { urls } from '../../../../utils/urls/urls'
import SyncroItemIcon from '../../../HomePage/HomeRatingItem/SyncroItemIcon/SyncroItemIcon'
import FlexCol from '../../../_common/flex/FlexCol'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import MyNextLink from '../../../_common/overrides/MyNextLink'
import Span from '../../../_common/text/Span'
import ItemSavedBy from '../../AddedBy/AddedBy'
import AvgRatingRow from '../../AvgRatingRow/AvgRatingRow'
import GenresSection from '../../GenresSection/GenresSection'

type Props = {
  item: SyncroItemDto
  isPreview?: boolean
  hideRatedBySection?: boolean
}

const SyncroItemMainInfosSection = ({ item, ...props }: Props) => {
  const itemTypeMap = useSyncroItemTypeMap({
    itemType: item?.type,
  })
  const { isMobile } = useMyMediaQuery()

  return (
    <FlexCol gap={8}>
      <AvgRatingRow item={item} isPreview={props.isPreview} />

      <FlexVCenter gap={4}>
        <SyncroItemIcon type={item.type} size={16} />
        <MyNextLink
          href={urls.pages.explore('browse', {
            type: item.type,
          })}
        >
          <Span
            sx={{
              ':hover': {
                textDecoration: 'underline',
              },
            }}
            size={props.isPreview || isMobile ? 'sm' : undefined}
          >
            {itemTypeMap.getTypeLabel()}
          </Span>
        </MyNextLink>
      </FlexVCenter>

      <GenresSection genres={item.genres} isPreview={props.isPreview} />

      {!props.hideRatedBySection && <ItemSavedBy itemId={item.id} />}
    </FlexCol>
  )
}

export default SyncroItemMainInfosSection
