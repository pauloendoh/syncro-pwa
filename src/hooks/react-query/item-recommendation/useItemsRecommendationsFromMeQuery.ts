import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { urls } from "../../../utils/urls"
import { ItemRecommendationDto } from "../notification/types/ItemRecommendationDto"

export const useItemsRecommendationsFromMeQuery = () => {
  return useQuery<ItemRecommendationDto[], AxiosError>([
    urls.api.recommendationsFromMe,
  ])
}
