import { PhotoProvider, PhotoView } from 'react-photo-view'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import SyncroItemImage from '../../_common/image/SyncroItemImage/SyncroItemImage'

type Props = {
  isMobile: boolean
  item: SyncroItemDto
}

const ImageSyncroItemPage = ({ isMobile, item }: Props) => {
  return (
    <PhotoProvider>
      <PhotoView src={item.imageUrl}>
        <div style={{ cursor: 'pointer' }}>
          <SyncroItemImage item={item} width={isMobile ? 100 : 160} />
        </div>
      </PhotoView>
    </PhotoProvider>
  )
}

export default ImageSyncroItemPage
