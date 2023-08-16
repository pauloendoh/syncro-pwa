export interface MangaExtraInfoDto {
  chaptersQty: number
  createdAt: string
  id: string
  status: string
  syncroItemId: string
  updatedAt: string
  mangaMalUrl: string

  alreadyCheckedAuthors: boolean
  authors: MangaAuthorConnection[]
}

interface MangaAuthorConnection {
  createdAt: string
  updatedAt: string
  mangaExtraInfoId: string
  authorId: string
  role: string
  author: MangaAuthor
}

interface MangaAuthor {
  id: string
  malUrl: string
  name: string
  createdAt: string
  updatedAt: string
}
