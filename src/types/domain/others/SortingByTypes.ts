export type SortingByType =
  | 'theirRatingDesc'
  | 'theirInterestDesc'
  | 'customOrdering'
  | 'avgInterest'
  | 'bothPlannedDesc'

type SortingOption = {
  type: SortingByType
  label: string
}

export const getSortingOptions = (thisIsYourList = false): SortingOption[] => {
  const options: SortingOption[] = [
    {
      label: '⭐ Rating - highest',
      type: 'theirRatingDesc',
    },
    {
      label: '🔖 Saved',
      type: 'theirInterestDesc',
    },
  ]

  if (thisIsYourList) return [...options]

  return [...options]
}
