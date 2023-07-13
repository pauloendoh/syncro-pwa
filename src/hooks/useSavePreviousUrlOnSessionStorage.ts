import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { sessionKeys } from '../utils/sessionStorageKeys'

export const useSavePreviousUrlOnSessionStorage = () => {
  const router = useRouter()

  useEffect(() => {
    const currentUrl = sessionStorage.getItem(sessionKeys.currentPath)
    if (currentUrl) {
      sessionStorage.setItem(sessionKeys.previousPath, currentUrl)
    }

    sessionStorage.setItem(sessionKeys.currentPath, router.asPath)
  }, [router.asPath])
}
