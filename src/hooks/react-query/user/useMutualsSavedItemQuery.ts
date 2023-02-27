import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { UserSimpleDto } from "../../../types/domain/user/UserSimpleDto"

import { urls } from "../../../utils/urls"

export type MutualSavedItemDto = {
  user: UserSimpleDto
  isSaved: boolean
}

export const useMutualsSavedItemQuery = (itemId: string) => {
  return useQuery<MutualSavedItemDto[], AxiosError>([
    urls.api.mutualsSavedItem(itemId),
  ])
}
