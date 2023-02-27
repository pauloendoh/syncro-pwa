import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { FollowDto } from "../../../types/domain/follow/FollowDto"

import { urls } from "../../../utils/urls"

export const useFollowersQuery = (userId?: string) => {
  return useQuery<FollowDto[], AxiosError>([urls.api.userFollowers(userId!)], {
    enabled: !!userId,
  })
}
