export const formatShortTimeago = (date: Date) => {
  // eg: 19h, 2w, 3m, 1y
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const diffInMinutes = Math.floor(diff / 1000 / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)
  const diffInWeeks = Math.floor(diffInDays / 7)
  const diffInMonths = Math.floor(diffInDays / 30)
  const diffInYears = Math.floor(diffInDays / 365)
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`
  }
  if (diffInHours < 24) {
    return `${diffInHours}h`
  }
  if (diffInDays < 7) {
    return `${diffInDays}d`
  }
  if (diffInWeeks < 4) {
    return `${diffInWeeks}w`
  }
  if (diffInMonths < 12) {
    return `${diffInMonths}m`
  }
  return `${diffInYears}y`
}
