import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { create } from 'zustand'

interface AsPathStoreType {
  prevAsPath: string | undefined
  currentAsPath: string | undefined
}

export const useAsPathStore = create<AsPathStoreType>((set) => ({
  prevAsPath: undefined,
  currentAsPath: undefined,
}))

/** Only use this in _app.tsx or root it's like a Provider */
export const useAsPathInitializer = () => {
  const { asPath } = useRouter()
  const { currentAsPath } = useAsPathStore()

  useEffect(() => {
    if (currentAsPath !== asPath) {
      useAsPathStore.setState((state) => ({
        ...state,
        currentAsPath: asPath,
        prevAsPath: currentAsPath,
      }))
    }
  }, [asPath, currentAsPath])
}
