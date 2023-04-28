import { useState } from 'react'
import { SyncroItemDto } from '../../../../../../types/domain/syncro-item/SyncroItemDto'
import SyncroItemLink from '../../../../../_common/SyncroItemLink/SyncroItemLink'
import SyncroItemImage from '../../../../../_common/image/SyncroItemImage/SyncroItemImage'
import Span from '../../../../../_common/text/Span'

type Props = {
  item: SyncroItemDto
}

const FavoriteItem = (props: Props) => {
  const [isHovering, setIsHovering] = useState(false)
  return (
    <SyncroItemLink item={props.item}>
      <div
        style={{ position: 'relative' }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <SyncroItemImage item={props.item} />
        {isHovering && (
          <Span
            size="xs"
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              background: 'rgba(0,0,0,0.5)',
            }}
            w="100%"
            lineClamp={2}
            p={4}
          >
            {props.item.title}
          </Span>
        )}
      </div>
    </SyncroItemLink>
  )
}

export default FavoriteItem
