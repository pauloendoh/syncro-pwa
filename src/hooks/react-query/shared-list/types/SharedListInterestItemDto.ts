export type SharedListInterestItemDto = {
  id: string

  sharedListId: string
  userId: string
  syncroItemId: string

  interest: number
}

export const buildSharedListInterestItemDto = () => {
  return {
    id: '',
    sharedListId: '',
    userId: '',
    syncroItemId: '',
    interest: 5,
  }
}
