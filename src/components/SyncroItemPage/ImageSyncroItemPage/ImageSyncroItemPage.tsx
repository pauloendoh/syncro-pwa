import { PhotoProvider, PhotoView } from 'react-photo-view'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { urls } from '../../../utils/urls'
import SyncroItemImage from '../../_common/image/SyncroItemImage/SyncroItemImage'
import MyNextLink from '../../_common/overrides/MyNextLink'

type Props = {
  isMobile: boolean
  item: SyncroItemDto
  isPreview?: boolean
}

const ImageSyncroItemPage = ({ isMobile, item, ...props }: Props) => {
  if (props.isPreview)
    return (
      <MyNextLink href={urls.pages.syncroItem(encodeURI(item.id!))}>
        <SyncroItemImage item={item} width={120} />
      </MyNextLink>
    )

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
