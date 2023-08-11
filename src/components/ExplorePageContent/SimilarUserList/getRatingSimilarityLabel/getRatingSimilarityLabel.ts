import { syncroItemTypeOptions } from '../../../../hooks/domains/syncro-item/syncroItemOptions/syncroItemOptions'
import { RatingSimilarityByTypeDto } from '../../../../types/domain/rating/RatingSimilarityByTypeDto'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

export function getRatingSimilarityLabel(params: {
  similarityDto: RatingSimilarityByTypeDto
  sharedItemType?: SyncroItemType
}) {
  const { similarityDto, sharedItemType } = params

  if (sharedItemType) {
    const option = syncroItemTypeOptions.find(
      (d) => d.itemType === sharedItemType
    )

    if (option) {
      return `${similarityDto.ratedSameItemsCount} ${
        similarityDto.ratedSameItemsCount <= 1
          ? `shared ${option.getTypeLabelLowerCase()}`
          : `shared ${option.getTypeLabelLowerCase(true)}`
      } · ${Math.floor(similarityDto.overallPercentage * 100)}% similarity`
    }
  }

  return `${similarityDto.ratedSameItemsCount} ${
    similarityDto.ratedSameItemsCount <= 1 ? 'item' : 'items'
  } · ${Math.floor(similarityDto.overallPercentage * 100)}% rating similarity`
}
