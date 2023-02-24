import Image from 'next/image'
import { SyncroItemDto } from '../../../../hooks/react-query/syncro-item/SyncroItemDto'
import { getSyncroItemImageOrDefault } from '../../../../utils/image/getSyncroItemImageOrDefault'

type Props = {
  item?: SyncroItemDto
}

const SyncroItemImage = (props: Props) => {
  return (
    <Image
      width={100}
      height={100}
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
