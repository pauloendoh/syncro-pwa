export const sessionKeys = {
  cameFromDomain: 'cameFromDomain',
  previousPath: 'previousPath',
  currentPath: 'currentPath',
}

export type SessionStorageKey = 'initialHistoryLength'

export function getSessionStorage(key: SessionStorageKey) {
  return sessionStorage.getItem(key)
}

export function setSessionStorage(key: SessionStorageKey, value: string) {
  sessionStorage.setItem(key, value)
}

export function removeSessionStorage(key: SessionStorageKey) {
  sessionStorage.removeItem(key)
}
