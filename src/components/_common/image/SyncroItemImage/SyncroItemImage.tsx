import { Center, useMantineTheme } from '@mantine/core'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { getSyncroItemImageOrDefault } from '../../../../utils/image/getSyncroItemImageOrDefault'
import SyncroItemIcon from '../../../HomePage/HomeRatingItem/SyncroItemIcon/SyncroItemIcon'
import MyNextImage300x400 from '../MyNextImage300/MyNextImage300x444'

type Props = {
  item?: SyncroItemDto
  width?: number
  forceHeight?: number

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

  const finalWidth = useMemo(() => {
    if (props.item?.type === 'book') {
      return props?.width || 89
    }
    return props?.width || 100
  }, [props.width])

  const height = useMemo(() => {
    if (props.forceHeight) {
      return props.forceHeight
    }
    if (props.item?.type === 'book') {
      return (finalWidth || 100) * (3 / 2)
    }

    if (props.item?.type === 'music') {
      return (finalWidth || 100) * (1 / 1)
    }

    // 300 x 400
    return (finalWidth || 100) * (400 / 300)
  }, [props.forceHeight, finalWidth])

  const [isError, setIsError] = useState(false)

  const showNextImage = useMemo(() => {
    // return false
    return (
      !isError &&
      props.item?.syncroRatingCount &&
      props.item?.syncroRatingCount > 0
    )
  }, [isError])

  return (
    <motion.div
      ref={props.ref}
      style={{
        position: 'relative',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {!!showNextImage ? (
        <MyNextImage300x400
          width={finalWidth}
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
      ) : (
        <img
          width={finalWidth}
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
    </motion.div>
  )
}

export default SyncroItemImage
