import { IoProvider } from 'socket.io-react-hook'

import 'react-photo-view/dist/react-photo-view.css'

import {
  ColorScheme,
  ColorSchemeProvider,
  LoadingOverlay,
  MantineProvider,
} from '@mantine/core'
import { useLocalStorage, useViewportSize } from '@mantine/hooks'
import { Notifications } from '@mantine/notifications'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import BreakpointsViewer from '../components/_common/BreakpointsViewer/BreakpointsViewer'
import { RouterTransition } from '../components/_common/RouterTransition/RouterTransition'
import useCheckAuthOrLogout from '../hooks/domains/auth/useCheckAuthUserOrLogout'
import { useMyMediaQuery } from '../hooks/useMyMediaQuery'
import { usePreserveScroll } from '../hooks/usePreserveScroll'
import { useSavePreviousUrlOnSessionStorage } from '../hooks/useSavePreviousUrlOnSessionStorage'
import useScreenSizeStore from '../hooks/zustand/useScreenSizeStore'
import { myTheme } from '../utils/mantine/myTheme'
import { myEnvs } from '../utils/myEnvs'
import { useMyQueryClient } from '../utils/myQueryClient'
import { sessionKeys, setSessionStorage } from '../utils/sessionStorageKeys'
import { zIndexes } from '../utils/zIndexes'

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  const myQueryClient = useMyQueryClient()
  const { checkAuthOrLogout, loading } = useCheckAuthOrLogout()

  const router = useRouter()

  useEffect(() => {
    setSessionStorage('initialHistoryLength', String(window.history.length))
  }, [])

  useEffect(() => {
    if (router.isReady) {
      checkAuthOrLogout()
      sessionStorage.setItem(sessionKeys.cameFromDomain, document.referrer)
    }
  }, [router.isReady])

  usePreserveScroll()

  const { height, width } = useViewportSize()
  const [setScreenHeight, setScreenWidth] = useScreenSizeStore((s) => [
    s.setScreenHeight,
    s.setScreenWidth,
  ])
  useEffect(() => {
    setScreenHeight(height)
    setScreenWidth(width)
  }, [height, width])

  useSavePreviousUrlOnSessionStorage()
  const { isMobile } = useMyMediaQuery()

  useEffect(() => {
    if (navigator.userAgent.includes('iPhone')) {
      document
        .querySelector('[name="viewport"]')
        ?.setAttribute(
          'content',
          'width=device-width, initial-scale=1.0, maximum-scale=1.0'
        )
    }
  }, [])

  return (
    <QueryClientProvider client={myQueryClient}>
      <ReactQueryDevtools />

      <Head>
        <title>Syncro</title>
        {/* favicon */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ ...myTheme, colorScheme }}
        >
          <Notifications
            position="bottom-center"
            zIndex={zIndexes.notification}
          />
          <RouterTransition />

          <LoadingOverlay
            visible={loading}
            overlayOpacity={1}
            transitionDuration={500}
            sx={{
              zIndex: zIndexes.loadingPageOverlay,
            }}
          />
          <IoProvider>
            <Component {...pageProps} />
            <BreakpointsViewer disabled={myEnvs.isProduction || false} />
          </IoProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </QueryClientProvider>
  )
}
