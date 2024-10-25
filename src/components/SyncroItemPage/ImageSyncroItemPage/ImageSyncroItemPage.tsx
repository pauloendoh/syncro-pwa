import { useEffect, useMemo } from 'react'
import { useQueryParams } from '../../../hooks/useQueryParams'
import { usePhotoSliderStoreV2 } from '../../../hooks/zustand/usePhotoSliderStore'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { PressableDivButton } from '../../_common/flex/PressableDivButton/PressableDivButton'
import SyncroItemImage from '../../_common/image/SyncroItemImage/SyncroItemImage'

type Props = {
  isMobile: boolean
  item: SyncroItemDto
  isPreview?: boolean
}

const ImageSyncroItemPage = ({ isMobile, item, ...props }: Props) => {
  const [shouldStartOpen] = useQueryParams().itemImageOpen

  const imageWidth = useMemo(() => {
    if (props.isPreview) {
      return 120
    }

    if (isMobile) {
      return 100
    }

    return 160
  }, [isMobile, props.isPreview])

  const { openPhotosSlider } = usePhotoSliderStoreV2({
    openPhotosSlider: true,
  })

  const handleOpen = () => {
    openPhotosSlider({
      images: [
        {
          key: item.id,
          src: item.imageUrl,
        },
      ],
      queryParams: {
        key: 'itemImageOpen',
        value: 'true',
      },
    })
  }

  useEffect(() => {
    if (shouldStartOpen) {
      handleOpen()
    }
  }, [])

  return (
    <div>
      {/* {hasJustClosed ? undefined : (
        <PhotoSlider
          images={[
            {
              key: item.id,
              src: item.imageUrl,
            },
          ]}
          visible={hasFirstRendered && !!isOpen}
          onClose={async () => {
            setIsOpen(null, {
              history: 'replace',
            })

            if (props.onCloseImageViewer) {
              props.onCloseImageViewer()
            }

            const isBack = await awaitIsBack()
            if (!isBack) {
              if (canGoBack()) {
                router.back()
              }
            }

            if (props.isPreview) {
              setTimeout(() => {
                // remove overflow hidden from body
                document.body.style.overflow = 'unset'

                setHasJustClosed(true)
              }, 250)
            }
          }}
        />
      )} */}

      <PressableDivButton
        style={{
          cursor: 'pointer',
        }}
        onClick={() => {
          handleOpen()
        }}
      >
        <SyncroItemImage item={item} width={imageWidth} />
      </PressableDivButton>
    </div>
  )
}

export default ImageSyncroItemPage
