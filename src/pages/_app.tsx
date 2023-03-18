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
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import useCheckAuthOrLogout from '../hooks/domains/auth/useCheckAuthUserOrLogout'
import { usePreserveScroll } from '../hooks/usePreserveScroll'
import useScreenSizeStore from '../hooks/zustand/useScreenSizeStore'
import { myTheme } from '../utils/mantine/myTheme'
import { useMyQueryClient } from '../utils/myQueryClient'
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

  useEffect(() => {
    checkAuthOrLogout()
  }, [])

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

  return (
    <>
      <QueryClientProvider client={myQueryClient}>
        <Head>
          <title>Syncro</title>
          {/* favicon */}
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
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
            <Notifications position="bottom-center" />
            <LoadingOverlay
              visible={loading}
              overlayOpacity={1}
              transitionDuration={500}
              sx={{
                zIndex: zIndexes.loadingPageOverlay,
              }}
            />
            <Component {...pageProps} />
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </>
  )
}
