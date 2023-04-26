export const formatShortTimeToday = (date: Date) => {
  // if today, show short time ago eg: 11m, 17h
  // if not today, show short date eg: Apr 21

  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const diffInMinutes = Math.floor(diff / 1000 / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInDays < 1) {
    if (diffInMinutes < 1) {
      return 'now'
    }
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`
    }
    return `${diffInHours}h`
  }

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const day = date.getDate()
  const monthIndex = date.getMonth()
  const monthName = monthNames[monthIndex]

  return `${monthName} ${day}`
}
