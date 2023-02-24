import Image from 'next/image'
import { SyncroItemDto } from '../../../../hooks/react-query/syncro-item/SyncroItemDto'
import { getSyncroItemImageOrDefault } from '../../../../utils/image/getSyncroItemImageOrDefault'

type Props = {
  item?: SyncroItemDto
  width?: number
  height?: number
}

const SyncroItemImage = (props: Props) => {
  return (
    <Image
      width={props.width || 100}
      height={props.height || 100}
      src={getSyncroItemImageOrDefault(props.item?.imageUrl)}
      alt={props.item?.title || 'syncro-item'}
      style={{
        objectFit: 'cover',
        borderRadius: 4,
      }}
    />
  )
}

export default SyncroItemImage
