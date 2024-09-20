import 'dayjs/locale/en'

import { DatesProvider } from '@mantine/dates'

import { IoProvider } from 'socket.io-react-hook'
import './global.css'

import 'react-photo-view/dist/react-photo-view.css'

import {
  Box,
  ColorScheme,
  ColorSchemeProvider,
  LoadingOverlay,
  MantineProvider,
} from '@mantine/core'
import {
  useLocalStorage,
  useResizeObserver,
  useViewportSize,
} from '@mantine/hooks'
import { Notifications } from '@mantine/notifications'
import { QueryClientProvider } from '@tanstack/react-query'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import BreakpointsViewer from '../components/_common/BreakpointsViewer/BreakpointsViewer'
import { RouterTransition } from '../components/_common/RouterTransition/RouterTransition'
import useCheckAuthCookieOrLogout from '../hooks/domains/auth/useCheckAuthCookieOrLogout'
import { useLogUserInfo } from '../hooks/domains/dashboard/useLogUserInfo'
import { usePreserveScroll } from '../hooks/usePreserveScroll'
import { useSavePreviousUrlOnSessionStorage } from '../hooks/useSavePreviousUrlOnSessionStorage'
import useScreenSizeStore from '../hooks/zustand/useScreenSizeStore'
import { myTheme } from '../utils/mantine/myTheme'
import { myEnvs } from '../utils/myEnvs'
import { useMyQueryClient } from '../utils/myQueryClient'
import { sessionKeys, setSessionStorage } from '../utils/sessionStorageKeys'
import { zIndexes } from '../utils/zIndexes'

export default function App(props: AppProps) {
  // PE 1/3
  const { Component, pageProps } = props

  // PE 1/3 - why do we need this? There's only dark scheme..
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  const myQueryClient = useMyQueryClient()
  const { checkAuthCookieOrLogout, loadingCheckAuthCookie } =
    useCheckAuthCookieOrLogout()

  const router = useRouter()

  useEffect(() => {
    setSessionStorage('initialHistoryLength', String(window.history.length))
  }, [])

  useEffect(() => {
    if (router.isReady) {
      checkAuthCookieOrLogout()
      sessionStorage.setItem(sessionKeys.cameFromDomain, document.referrer)
    }
  }, [router.isReady])

  usePreserveScroll()

  const [appRef, rect] = useResizeObserver()

  const { height, width } = useViewportSize()
  const [setScreenHeight, setScreenWidth, setLvhHeight, setDiffLvh] =
    useScreenSizeStore((s) => [
      s.setScreenHeight,
      s.setScreenWidth,
      s.setLvhHeight,
      s.setDiffLvh,
    ])
  useEffect(() => {
    setScreenHeight(height)
    setScreenWidth(width)
    setLvhHeight(Math.ceil(rect.height))
    setDiffLvh(Math.ceil(rect.height) - height)
  }, [height, width, rect.height])

  useSavePreviousUrlOnSessionStorage()
  useLogUserInfo()

  return (
    <QueryClientProvider client={myQueryClient}>
      {/* <ReactQueryDevtools /> */}

      <Head>
        <title>Syncro</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, viewport-fit=cover"
        />
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
          <Box
            ref={appRef}
            className="App"
            sx={{
              minHeight: '100lvh',
              position: 'fixed',
              visibility: 'hidden',
            }}
          />
          <DatesProvider settings={{}}>
            <Notifications
              position="bottom-center"
              zIndex={zIndexes.notification}
            />
            <RouterTransition />

            <LoadingOverlay
              visible={loadingCheckAuthCookie}
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
          </DatesProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </QueryClientProvider>
  )
}
