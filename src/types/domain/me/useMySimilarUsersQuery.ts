import { useQuery } from '@tanstack/react-query'
import { urls } from '../../../utils/urls'
import { RatingSimilarityByTypeDto } from '../rating/RatingSimilarityByTypeDto'

export const useMySimilarUsersQuery = () => {
  return useQuery<RatingSimilarityByTypeDto[]>([urls.api.mySimilarUsers])
}
