export const getSyncroItemImageOrDefault = (params: {
  url: string
  isError: boolean
}) => {
  if (params.isError) {
    return 'https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'
  }

  if (params.url) return params.url
  return 'https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'
}
