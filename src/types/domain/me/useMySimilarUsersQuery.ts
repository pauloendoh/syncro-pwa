import { useQuery } from "@tanstack/react-query"
import { urls } from "../../../utils/urls"
import { RatingSimilarityDto } from "../rating/RatingSimilarityDto"

export const useMySimilarUsersQuery = () => {
  return useQuery<RatingSimilarityDto[]>([urls.api.mySimilarUsers])
}
