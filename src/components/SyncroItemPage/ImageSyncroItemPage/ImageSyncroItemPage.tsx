import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { PhotoSlider } from 'react-photo-view'
import { useMyRouterQuery } from '../../../hooks/useMyRouterQuery'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { QueryParams } from '../../../utils/queryParams'
import { urls } from '../../../utils/urls'
import SyncroItemImage from '../../_common/image/SyncroItemImage/SyncroItemImage'
import MyNextLink from '../../_common/overrides/MyNextLink'

type Props = {
  isMobile: boolean
  item: SyncroItemDto
  isPreview?: boolean
}

const ImageSyncroItemPage = ({ isMobile, item, ...props }: Props) => {
  const router = useRouter()

  const { itemImageOpen } = useMyRouterQuery()

  useEffect(() => {
    if (!itemImageOpen && !props.isPreview) {
      delete router.query[QueryParams.itemImageOpen]
      router.push(router, undefined, { scroll: false })
    }
  }, [itemImageOpen, props.isPreview])

  if (props.isPreview)
    return (
      <MyNextLink href={urls.pages.syncroItem(encodeURI(item.id!))}>
        <SyncroItemImage item={item} width={120} />
      </MyNextLink>
    )

  return (
    <>
      <PhotoSlider
        images={[
          {
            key: item.id,
            src: item.imageUrl,
          },
        ]}
        visible={!!itemImageOpen}
        onClose={() => {
          delete router.query[QueryParams.itemImageOpen]
          router.push(router, undefined, { scroll: false })
        }}
      />
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => {
          router.query[QueryParams.itemImageOpen] = 'true'
          router.push(router, undefined, { scroll: false })
        }}
      >
        <SyncroItemImage item={item} width={isMobile ? 100 : 160} />
      </div>
    </>
  )
}

export default ImageSyncroItemPage
