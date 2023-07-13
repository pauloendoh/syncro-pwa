import { syncroItemOptions } from '../../../../hooks/domains/syncro-item/syncroItemOptions/syncroItemOptions'
import { RatingSimilarityDto } from '../../../../types/domain/rating/RatingSimilarityDto'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

export function getRatingSimilarityLabel(params: {
  similarityDto: RatingSimilarityDto
  sharedItemType?: SyncroItemType
}) {
  const { similarityDto, sharedItemType } = params

  if (sharedItemType) {
    const option = syncroItemOptions.find((d) => d.itemType === sharedItemType)

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
