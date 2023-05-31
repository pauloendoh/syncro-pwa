import { ImportRatingsType } from '../../../../../hooks/zustand/modals/useImportRatingsModalStore'

export const ratingsImportOptions: {
  type: ImportRatingsType
  title: string
}[] = [
  {
    type: 'MAL-Anime',
    title: 'MyAnimeList - Anime & Manga',
  },
]
