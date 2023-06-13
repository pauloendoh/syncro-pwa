import { HoverCard } from '@mantine/core'
import { FloatingPosition } from '@mantine/core/lib/Floating'
import { useMouse } from '@mantine/hooks'
import React, { useMemo, useState } from 'react'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { cookieKeys } from '../../../utils/consts/cookieKeys'
import nookies from '../../../utils/nookies'
import { urls } from '../../../utils/urls'
import SyncroItemPaperContent from '../../SyncroItemPage/SyncroItemPaperContent/SyncroItemPaperContent'
import MyNextLink from '../overrides/MyNextLink'

type Props = {
  item: SyncroItemDto
  linkProps?: React.ComponentPropsWithRef<typeof MyNextLink>
  children: React.ReactNode
  onClick?: () => void
  draggable?: boolean
  disablePreview?: boolean
  previewWithinPortal?: boolean
  previewPosition?: FloatingPosition
}

const SyncroItemLink = (props: Props) => {
  const handleClick = () => {
    nookies.set(
      null,
      cookieKeys.prefetchedItem(props.item.id),
      JSON.stringify(props.item),
      {
        secure: true,
        path: '/',
        sameSite: 'strict',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
      }
    )
  }

  const [isDragging, setIsDragging] = React.useState(false)

  const { isMobile } = useMyMediaQuery()

  const { x, y } = useMouse()

  const initialPosition = useMemo(() => {
    if (props.previewPosition) return props.previewPosition

    // only if y is on the last 300px of the bottom of the screen
    if (window && y > window.innerHeight / 2) return 'top'

    return 'bottom'
  }, [y, props.previewPosition])

  const [keepPosition, setKeepPosition] = useState(initialPosition)

  const [forceDisabled, setForceDisabled] = useState(false)

  return (
    <HoverCard
      openDelay={500}
      closeDelay={250}
      width={400}
      disabled={isMobile || props.disablePreview || forceDisabled}
      withArrow
      withinPortal={props.previewWithinPortal}
      middlewares={{
        flip: false, // https://floating-ui.com/docs/flip
        shift: true, //  https://floating-ui.com/docs/shift
      }}
      position={keepPosition}
      onOpen={() => {
        setKeepPosition(initialPosition)
      }}
      onClose={() => {
        setTimeout(() => {
          setForceDisabled(true)
        }, 250)
        setTimeout(() => {
          setForceDisabled(false)
        }, 2000)
      }}
    >
      <HoverCard.Target>
        <span>
          <MyNextLink
            href={urls.pages.syncroItem(encodeURI(props.item.id!))}
            {...props.linkProps}
            onClick={(e) => {
              if (isDragging) {
                e.preventDefault()
                setIsDragging(false)
                return
              }
              handleClick()
              if (props.onClick) props.onClick()
            }}
            onDragStart={
              props.draggable
                ? (e) => {
                    setIsDragging(true)
                    e.preventDefault()
                  }
                : undefined
            }
          >
            {props.children}
          </MyNextLink>
        </span>
      </HoverCard.Target>
      <HoverCard.Dropdown pb={16}>
        <SyncroItemPaperContent
          initialData={props.item}
          syncroItemId={props.item.id!}
          isPreview
        />
      </HoverCard.Dropdown>
    </HoverCard>
  )
}

export default SyncroItemLink
