import { syncroItemTypeOptions } from '../../../../hooks/domains/syncro-item/syncroItemOptions/syncroItemOptions'
import { RatingSimilarityByTypeDto } from '../../../../types/domain/rating/RatingSimilarityByTypeDto'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

export function getRatingSimilarityLabel(params: {
  similarityDto?: RatingSimilarityByTypeDto
  sharedItemType?: SyncroItemType
}) {
  const { similarityDto, sharedItemType } = params

  if (!similarityDto) {
    return {
      countLabel: '',
      similarityLabel: '',
    }
  }

  if (sharedItemType) {
    const option = syncroItemTypeOptions.find(
      (d) => d.itemType === sharedItemType
    )

    if (option) {
      return {
        countLabel: `${similarityDto.ratedSameItemsCount} ${
          similarityDto.ratedSameItemsCount <= 1
            ? `shared ${option.getTypeLabelLowerCase()}`
            : `shared ${option.getTypeLabelLowerCase(true)}`
        }`,
        similarityLabel: `${Math.round(
          similarityDto.overallPercentage * 100
        )}% similarity`,
      }
    }
  }

  return {
    countLabel: `${similarityDto.ratedSameItemsCount} ${
      similarityDto.ratedSameItemsCount <= 1 ? 'item' : 'items'
    }`,
    similarityLabel: `${Math.round(
      similarityDto.overallPercentage * 100
    )}% rating similarity`,
    isHighSimilarity:
      similarityDto.overallPercentage > 0.5 &&
      similarityDto.ratedSameItemsCount > 10,
  }
}
