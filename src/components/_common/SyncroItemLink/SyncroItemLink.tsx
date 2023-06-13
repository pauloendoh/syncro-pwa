import { HoverCard } from '@mantine/core'
import { FloatingPosition } from '@mantine/core/lib/Floating'
import React from 'react'
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

  return (
    <HoverCard
      openDelay={500}
      closeDelay={500}
      width={400}
      disabled={isMobile || props.disablePreview}
      withArrow
      withinPortal={props.previewWithinPortal}
      middlewares={{
        flip: true, // https://floating-ui.com/docs/flip
        shift: true, //  https://floating-ui.com/docs/shift
      }}
      position={props.previewPosition}
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
