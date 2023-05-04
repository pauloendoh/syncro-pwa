import React from 'react'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { cookieKeys } from '../../../utils/consts/cookieKeys'
import nookies from '../../../utils/nookies'
import { urls } from '../../../utils/urls'
import MyNextLink from '../overrides/MyNextLink'

type Props = {
  item: SyncroItemDto
  linkProps?: React.ComponentPropsWithRef<typeof MyNextLink>
  children: React.ReactNode
  onClick?: () => void
  draggable?: boolean
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

  return (
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
  )
}

export default SyncroItemLink
