import { Box, Center, useMantineTheme } from '@mantine/core'
import { useMemo, useState } from 'react'
import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { getSyncroItemImageOrDefault } from '../../../../utils/image/getSyncroItemImageOrDefault'
import SyncroItemIcon from '../../../HomePage/HomeRatingItem/SyncroItemIcon/SyncroItemIcon'
import MyNextImage300x400 from '../MyNextImage300/MyNextImage300x444'

type Props = {
  item?: SyncroItemDto
  width?: number

  /**
   * @deprecated
   */
  height?: number
  showItemType?: SyncroItemType
  ref?: any
  draggable?: boolean
}

const SyncroItemImage = (props: Props) => {
  const theme = useMantineTheme()

  const width = props.width || 100

  const height = useMemo(() => {
    // 300 x 444
    return (width || 100) * (400 / 300)
  }, [width])

  const [isError, setIsError] = useState(true)

  return (
    <Box pos="relative" ref={props.ref}>
      {isError && (
        <img
          width={props.width || 100}
          height={height}
          src={getSyncroItemImageOrDefault(props.item?.imageUrl)}
          alt={props.item?.title || 'syncro-item'}
          style={{
            objectFit: 'cover',
            borderRadius: 4,
          }}
          onDragStart={(e) => {
            if (props.draggable) {
              e.preventDefault()
            }
          }}
        />
      )}
      {!isError && (
        <MyNextImage300x400
          width={props.width || 100}
          height={height}
          src={getSyncroItemImageOrDefault(props.item?.imageUrl)}
          alt={props.item?.title || 'syncro-item'}
          style={{
            objectFit: 'cover',
            borderRadius: 4,
          }}
          onError={() => setIsError(true)}
          onDragStart={(e) => {
            if (props.draggable) {
              e.preventDefault()
            }
          }}
        />
      )}

      {props.showItemType && (
        <Center
          pos="absolute"
          right={2}
          bottom={2}
          title={props.showItemType}
          sx={{
            backgroundColor: theme.colors.gray[9],
            width: 32,
            height: 32,
            borderRadius: '50%',
          }}
        >
          <SyncroItemIcon type={props.showItemType} size={16} />
        </Center>
      )}
    </Box>
  )
}

export default SyncroItemImage
