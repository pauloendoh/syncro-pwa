import { HoverCard } from '@mantine/core'
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
      closeDelay={250}
      width={400}
      disabled={isMobile || props.disablePreview}
      withArrow
      withinPortal={props.previewWithinPortal}
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
          initialData={null}
          syncroItemId={props.item.id!}
          titleIsLink
        />
      </HoverCard.Dropdown>
    </HoverCard>
  )
}

export default SyncroItemLink
