import { useQuery } from "@tanstack/react-query"
import { InterestDto } from "../../../types/domain/interest/InterestDto"

import { urls } from "../../../utils/urls"

export const useMyInterestsQuery = () => {
  return useQuery<InterestDto[], Error>([urls.api.myInterests])
}

export const useMyInterestQU = (itemId?: string | null) => {
  const { data } = useMyInterestsQuery()

  return data?.find((rating) => rating.syncroItemId === itemId)
}
