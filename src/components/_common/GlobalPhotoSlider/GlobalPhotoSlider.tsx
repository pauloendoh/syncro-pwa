import router from 'next/router'
import { useEffect } from 'react'
import { PhotoSlider } from 'react-photo-view'
import { useMyQueryState } from '../../../hooks/useMyQueryState'
import { awaitIsBack } from '../../../hooks/utils/useAwaitIsBack'
import { useHasFirstRendered } from '../../../hooks/utils/useHasFirstRendered'
import { usePhotoSliderStoreV2 } from '../../../hooks/zustand/usePhotoSliderStore'
import { canGoBack } from '../../../utils/router/canGoBack'

type Props = {}

const GlobalPhotoSlider = ({ ...props }: Props) => {
  const { initialValues, isOpen, closePhotosSlider } = usePhotoSliderStoreV2({
    isOpen: true,
    closePhotosSlider: true,
    initialValues: true,
  })

  const [queryValue, setQueryParam] = useMyQueryState(
    initialValues.queryParams.key
  )

  useEffect(() => {
    if (isOpen) {
      setQueryParam(initialValues.queryParams.value)
    }
  }, [isOpen])

  const hasFirstRendered = useHasFirstRendered()

  return (
    <PhotoSlider
      images={initialValues.images}
      visible={hasFirstRendered && !!queryValue}
      onClose={async () => {
        closePhotosSlider()

        setQueryParam(null, {
          history: 'replace',
        })

        if (initialValues.disableDoubleBackOnClose) {
          return
        }

        const isBack = await awaitIsBack()
        if (!isBack) {
          if (canGoBack()) {
            router.back()
          }
        }
      }}
    />
  )
}

export default GlobalPhotoSlider
