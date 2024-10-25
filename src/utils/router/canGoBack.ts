import { getSessionStorage } from '../sessionStorageKeys'

export const canGoBack = () => {
  const historyLength = window.history.length
  const initialHistoryLength = Number(getSessionStorage('initialHistoryLength'))

  return historyLength > initialHistoryLength
}
