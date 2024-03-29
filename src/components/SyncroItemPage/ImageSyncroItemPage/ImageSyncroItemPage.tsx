import { PhotoSlider } from 'react-photo-view'
import { useQueryParams } from '../../../hooks/useQueryParams'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import SyncroItemImage from '../../_common/image/SyncroItemImage/SyncroItemImage'

type Props = {
  isMobile: boolean
  item: SyncroItemDto
  isPreview?: boolean
}

const ImageSyncroItemPage = ({ isMobile, item, ...props }: Props) => {
  const { queryValue, setQuery, removeQuery } = useQueryParams().itemImageOpen

  // if (props.isPreview)
  //   return (
  //     <MyNextLink href={urls.pages.syncroItem(encodeURI(item.id!))}>
  //       <SyncroItemImage item={item} width={120} />
  //     </MyNextLink>
  //   )

  return (
    <>
      <PhotoSlider
        images={[
          {
            key: item.id,
            src: item.imageUrl,
          },
        ]}
        visible={!!queryValue}
        onClose={() => {
          removeQuery({ backTwice: true })
        }}
      />
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setQuery('true')
        }}
      >
        <SyncroItemImage
          item={item}
          width={props.isPreview ? 120 : isMobile ? 100 : 160}
        />
      </div>
    </>
  )
}

export default ImageSyncroItemPage
