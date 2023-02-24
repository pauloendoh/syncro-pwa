import { useMemo } from 'react'
import { SyncroItemType } from '../../../domains/syncro-item/SyncroItemType'

export const useSyncroItemTypeMap = (by: {
  tabIndex?: number
  itemType?: SyncroItemType
}) => {
  const options: {
    itemType: SyncroItemType
    labelPlural: string
    site: string
    tabIndex: number
    getTypeLabel: (isPlural?: boolean) => string
    getTypeLabelLowerCase: (isPlural?: boolean) => string
  }[] = [
    {
      itemType: 'tvSeries',
      labelPlural: 'TV Series',

      site: 'IMDb',
      tabIndex: 0,
      getTypeLabel: (isPlural = false) =>
        isPlural ? 'TV Series' : 'TV Series',
      getTypeLabelLowerCase: (isPlural = false) =>
        isPlural ? 'tv series' : 'tv series',
    },
    {
      itemType: 'movie',
      labelPlural: 'Movies',
      site: 'IMDb',
      tabIndex: 1,
      getTypeLabel: (isPlural = false) => (isPlural ? 'Movies' : 'Movie'),
      getTypeLabelLowerCase: (isPlural = false) =>
        isPlural ? 'movies' : 'movie',
    },
    {
      itemType: 'game',
      labelPlural: 'Games',
      site: 'IGDb',
      tabIndex: 2,
      getTypeLabel: (isPlural = false) => (isPlural ? 'Games' : 'Game'),
      getTypeLabelLowerCase: (isPlural = false) =>
        isPlural ? 'games' : 'game',
    },
    {
      itemType: 'manga',
      labelPlural: 'Manga',
      site: 'MAL',
      tabIndex: 3,
      getTypeLabel: (isPlural = false) => (isPlural ? 'Manga' : 'Manga'),
      getTypeLabelLowerCase: (isPlural = false) =>
        isPlural ? 'manga' : 'manga',
    },
  ]

  const item = useMemo(() => {
    let result = options
    if (by.itemType) result = result.filter((r) => r.itemType === by.itemType)
    if (by.tabIndex) result = result.filter((r) => r.tabIndex === by.tabIndex)

    return result[0]
  }, [options, by])

  return item
}
