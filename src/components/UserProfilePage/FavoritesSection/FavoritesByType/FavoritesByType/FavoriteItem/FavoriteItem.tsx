import { ActionIcon, Tooltip, useMantineTheme } from '@mantine/core'
import { FloatingPosition } from '@mantine/core/lib/Floating'
import { useMemo, useState } from 'react'
import { MdClose, MdStar } from 'react-icons/md'
import { useMyRatingsQuery } from '../../../../../../hooks/react-query/rating/useMyRatingsQuery'
import { useMyColors } from '../../../../../../hooks/useMyColors'
import { useMyMediaQuery } from '../../../../../../hooks/useMyMediaQuery'
import { useRatingStatusIcon } from '../../../../../../types/domain/rating/useRatingStatusIcon/useRatingStatusIcon'
import { SyncroItemDto } from '../../../../../../types/domain/syncro-item/SyncroItemDto'
import { getItemTitleAndYear } from '../../../../../../utils/domains/syncro-item/getItemTitleAndYear'
import { useGetFinalRatingCountAvgSite } from '../../../../../SyncroItemPage/AvgRatingRow/useGetFinalRatingCountAvgSite/useGetFinalRatingCountAvgSite'
import SyncroItemLink from '../../../../../_common/SyncroItemLink/SyncroItemLink'
import FlexCol from '../../../../../_common/flex/FlexCol'
import FlexVCenter from '../../../../../_common/flex/FlexVCenter'
import SyncroItemImage from '../../../../../_common/image/SyncroItemImage/SyncroItemImage'
import Span from '../../../../../_common/text/Span'

type Props = {
  item: SyncroItemDto
  draggable?: boolean
  previewPosition?: FloatingPosition
  width?: number
  alwaysShowTitle?: boolean
  showAvgRating?: boolean
  disablePreview?: boolean
  onClose?: () => void
  onCloseTooltip?: string
  showMyRating?: boolean
}

const FavoriteItem = (props: Props) => {
  const [isHovering, setIsHovering] = useState(false)
  const { isMobile } = useMyMediaQuery()

  const showTitle = isHovering || isMobile || props.alwaysShowTitle

  const width = props.width || 100
  const { ratingYellow } = useMyColors()
  const theme = useMantineTheme()

  const itemFinalRating = useGetFinalRatingCountAvgSite(props.item)

  const { data: myRatings } = useMyRatingsQuery()

  const myRating = useMemo(() => {
    return myRatings?.find((r) => r.syncroItemId === props.item.id)
  }, [myRatings, props.item.id])

  const MyRatingStatusIcon = useRatingStatusIcon(
    myRating?.status || 'COMPLETED'
  )

  const hasCornerInfo = useMemo(() => {
    return !!props.showMyRating || !!props.showAvgRating || !!props.onClose
  }, [])

  return (
    <SyncroItemLink
      item={props.item}
      draggable
      disablePreview={props.disablePreview}
      previewWithinPortal
      previewPosition={props.previewPosition}
    >
      <div
        style={{ position: 'relative' }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <SyncroItemImage
          item={props.item}
          draggable={props.draggable}
          width={width}
        />
        {showTitle && (
          <Span
            size="xs"
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              backgroundImage: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0))',
            }}
            lineClamp={isMobile ? 1 : 2}
            p={4}
            w={width}
          >
            {getItemTitleAndYear(props.item)}
          </Span>
        )}

        {hasCornerInfo && (
          <FlexCol
            gap={2}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              background: `#151515cc`,
              width: 'fit-content',
              padding: 4,
              paddingTop: 2,
              borderRadius: '0 0 0 8px',
            }}
          >
            {
              <>
                {props.showAvgRating && (
                  <FlexVCenter>
                    <MdStar color={ratingYellow} />
                    <Span color={ratingYellow} size="xs" align="center" w={15}>
                      {itemFinalRating.avgRating || '?'}
                    </Span>
                  </FlexVCenter>
                )}

                {!!myRating && props.showMyRating && (
                  <FlexVCenter>
                    <MyRatingStatusIcon color={theme.colors.secondary[9]} />
                    <Span
                      color={theme.colors.secondary[9]}
                      size="xs"
                      align="center"
                      w={15}
                    >
                      {myRating.ratingValue}
                    </Span>
                  </FlexVCenter>
                )}
                {props.onClose && (
                  <Tooltip
                    label={props.onCloseTooltip}
                    disabled={!props.onCloseTooltip}
                    withArrow
                  >
                    <ActionIcon
                      sx={{
                        paddingLeft: 4,
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        props.onClose?.()
                      }}
                    >
                      <MdClose />
                    </ActionIcon>
                  </Tooltip>
                )}
              </>
            }
          </FlexCol>
        )}
      </div>
    </SyncroItemLink>
  )
}

export default FavoriteItem
