import SyncroItemIcon from '../../../components/HomePage/HomeRatingItem/SyncroItemIcon/SyncroItemIcon'
import Span from '../../../components/_common/text/Span'
import { useSyncroItemTypeMap } from '../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { getItemTitleAndYear } from './getItemTitleAndYear'

type Props = {
  item: SyncroItemDto
  showIcon?: boolean
  yearIconWidth?: number
}

const ItemTitleAndYear = ({ item, showIcon, ...props }: Props) => {
  const typeMap = useSyncroItemTypeMap({
    itemType: item.type,
  })

  if (item?.year && showIcon) {
    return (
      <span>
        {item?.title}{' '}
        <Span
          miw={props.yearIconWidth || 80}
          maw={props.yearIconWidth || 80}
          display="inline-block"
        >
          [{item.year}]
          <Span
            display={'inline'}
            style={{
              marginLeft: 4,
              position: 'relative',
              top: 3,
            }}
            title={typeMap?.getTypeLabel()}
          >
            <SyncroItemIcon type={item?.type} />
          </Span>
        </Span>
      </span>
    )
  }

  return <>{getItemTitleAndYear(item)}</>
}

export default ItemTitleAndYear
