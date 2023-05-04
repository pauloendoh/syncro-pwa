import { useState } from 'react'
import { useMyMediaQuery } from '../../../../../../hooks/useMyMediaQuery'
import { SyncroItemDto } from '../../../../../../types/domain/syncro-item/SyncroItemDto'
import SyncroItemLink from '../../../../../_common/SyncroItemLink/SyncroItemLink'
import SyncroItemImage from '../../../../../_common/image/SyncroItemImage/SyncroItemImage'
import Span from '../../../../../_common/text/Span'

type Props = {
  item: SyncroItemDto
  draggable?: boolean
}

const FavoriteItem = (props: Props) => {
  const [isHovering, setIsHovering] = useState(false)
  const { isMobile } = useMyMediaQuery()

  const showTitle = isHovering || isMobile

  return (
    <SyncroItemLink item={props.item} draggable>
      <div
        style={{ position: 'relative' }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <SyncroItemImage item={props.item} draggable={props.draggable} />
        {showTitle && (
          <Span
            size="xs"
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              backgroundImage: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0))',
            }}
            w="100%"
            lineClamp={isMobile ? 1 : 2}
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
