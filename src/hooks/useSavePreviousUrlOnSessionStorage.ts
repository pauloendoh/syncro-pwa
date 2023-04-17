import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { sessionStorageKeys } from '../utils/sessionStorageKeys'

export const useSavePreviousUrlOnSessionStorage = () => {
  const router = useRouter()

  useEffect(() => {
    const currentUrl = sessionStorage.getItem(sessionStorageKeys.currentPath)
    if (currentUrl) {
      sessionStorage.setItem(sessionStorageKeys.previousPath, currentUrl)
    }

    sessionStorage.setItem(sessionStorageKeys.currentPath, router.asPath)
  }, [router.asPath])
}
