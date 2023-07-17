import { MessageDto } from '../hooks/react-query/message/types/MessageDto'
import { webPushMessageTypes } from '../utils/consts/webPushMessageTypes'
import { urls } from '../utils/urls'
import { util } from './util'

declare let self: ServiceWorkerGlobalScope

// To disable all workbox logging during development, you can set self.__WB_DISABLE_DEV_LOGS to true
// https://developers.google.com/web/tools/workbox/guides/configure-workbox#disable_logging
//
// self.__WB_DISABLE_DEV_LOGS = true

util()

// listen to message event from window
self.addEventListener('message', (event) => {
  // HOW TO TEST THIS?
  // Run this in your browser console:
  //     window.navigator.serviceWorker.controller.postMessage({command: 'log', message: 'hello world'})
  // OR use next-pwa injected workbox object
  //     window.workbox.messageSW({command: 'log', message: 'hello world'})
  console.log(event?.data)
})

self.addEventListener('push', async (event) => {
  const data = JSON.parse(event?.data.text() || '{}')

  // don't show notification if tab is opened

  const isTabOpened = await self.clients
    .matchAll({ type: 'window', includeUncontrolled: true })
    .then(function (clientList) {
      if (clientList.length > 0) {
        for (let i = 0; i < clientList.length; i++) {
          if (clientList[i].focused) {
            return true
          }
        }
      }
      return false
    })

  if (isTabOpened) return

  event?.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      tag: data.type,
      vibrate: [200, 100, 200, 100, 200, 100, 200],
    })
  )
})

self.addEventListener('notificationclick', (event) => {
  event?.notification.close()

  const data = JSON.parse(event?.notification?.data?.text() || '{}')

  if (data?.type === webPushMessageTypes.newMessage) {
    const message: MessageDto = data?.data
    if (!message) return

    const roomId = message.roomId

    // open /messages/[roomId] in new tab if not already open
    event?.waitUntil(
      self.clients
        .matchAll({ type: 'window', includeUncontrolled: true })
        .then(function (clientList) {
          if (clientList.length > 0) {
            let client = clientList[0]
            for (let i = 0; i < clientList.length; i++) {
              if (
                clientList[i].focused &&
                clientList[i].url === urls.pages.messageRoom(roomId)
              ) {
                client = clientList[i]
              }
            }
            return client.focus()
          }
          return self.clients.openWindow(urls.pages.messageRoom(roomId))
        })
    )
    return
  }

  event?.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then(function (clientList) {
        if (clientList.length > 0) {
          let client = clientList[0]
          for (let i = 0; i < clientList.length; i++) {
            if (clientList[i].focused) {
              client = clientList[i]
            }
          }
          return client.focus()
        }
        return self.clients.openWindow('/')
      })
  )
})
