export function getDomainFromUrl(url: string) {
  const urlObj = new URL(url)
  // exclude www.

  return urlObj.hostname.replace(/^www\./, '')
}
