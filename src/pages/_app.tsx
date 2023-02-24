import {
  ColorScheme,
  ColorSchemeProvider,
  LoadingOverlay,
  MantineProvider,
} from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { NotificationsProvider } from '@mantine/notifications'
import { QueryClientProvider } from '@tanstack/react-query'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import useCheckAuthOrLogout from '../domains/auth/useCheckAuthUserOrLogout'
import { myTheme } from '../utils/mantine/myTheme'
import { useMyQueryClient } from '../utils/myQueryClient'

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
            <NotificationsProvider>
              <LoadingOverlay
                visible={loading}
                overlayOpacity={1}
                transitionDuration={500}
              />
              <Component {...pageProps} />
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </>
  )
}
