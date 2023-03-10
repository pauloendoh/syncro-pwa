export const getLabelByRatingValue = (ratingValue: number | null) => {
  if (ratingValue && ratingValue > 0) {
    return `${ratingValue} - ${getShortLabelByRatingValue(ratingValue)}`
  }

  return 'Save rating'
}

export const getShortLabelByRatingValue = (ratingValue: number | null) => {
  if (ratingValue === 1) return 'Horrendous'
  if (ratingValue === 2) return 'Waste of time'
  if (ratingValue === 3) return 'Ultra bad'
  if (ratingValue === 4) return 'Super bad'
  if (ratingValue === 5) return 'Bad'
  if (ratingValue === 6) return 'So so'
  if (ratingValue === 7) return 'Ok'
  if (ratingValue === 8) return 'Good'
  if (ratingValue === 9) return 'Very good'
  if (ratingValue === 10) return 'Perfect!'
  return 'Rate'
}
