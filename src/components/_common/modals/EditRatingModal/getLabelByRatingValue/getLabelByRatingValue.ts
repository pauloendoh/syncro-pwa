export const getLabelByRatingValue = (ratingValue: number | null) => {
  if (ratingValue && ratingValue > 0) {
    return `${ratingValue} - ${getShortLabelByRatingValue(ratingValue)}`
  }

  return 'Save rating'
}

export const getShortLabelByRatingValue = (ratingValue: number | null) => {
  if (ratingValue === 1) return 'Appalling'
  if (ratingValue === 2) return 'Horrible'
  if (ratingValue === 3) return 'Very bad'
  if (ratingValue === 4) return 'Bad'
  if (ratingValue === 5) return 'Average'
  if (ratingValue === 6) return 'Fine'
  if (ratingValue === 7) return 'Good'
  if (ratingValue === 8) return 'Very good'
  if (ratingValue === 9) return 'Excellent!'
  if (ratingValue === 10) return 'Masterpiece!'
  return 'Rate'
}
