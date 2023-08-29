import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'
import { urls } from '../../../../utils/urls/urls'
import SyncroItemIcon from '../../../HomePage/HomeRatingItem/SyncroItemIcon/SyncroItemIcon'
import FlexCol from '../../../_common/flex/FlexCol'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import MyNextLink from '../../../_common/overrides/MyNextLink'
import Span from '../../../_common/text/Span'
import AvgRatingRow from '../../AvgRatingRow/AvgRatingRow'
import GenresSection from '../../GenresSection/GenresSection'
import ItemRatedBy from '../../ItemRatedBy/ItemRatedBy'

type Props = {
  item: SyncroItemDto
  isPreview?: boolean
  hideRatedBySection?: boolean
}

const SyncroItemMainInfosSection = ({ item, ...props }: Props) => {
  const itemTypeMap = useSyncroItemTypeMap({
    itemType: item?.type,
  })
  return (
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

      {!props.hideRatedBySection && <ItemRatedBy itemId={item.id} />}
    </FlexCol>
  )
}

export default SyncroItemMainInfosSection
