import { syncroItemTypeOptions } from '../../hooks/domains/syncro-item/syncroItemOptions/syncroItemOptions'
import { SyncroItemType } from '../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

export const htmlTitles = {
  index: 'Syncro',
  userPage: (username: string) => `${username} | Syncro`,
  userItems: (params: { username: string; itemType: SyncroItemType }) =>
    `${params.username} | ${syncroItemTypeOptions
      .find((r) => r.itemType === params.itemType)
      ?.getTypeLabel()}`,
}
