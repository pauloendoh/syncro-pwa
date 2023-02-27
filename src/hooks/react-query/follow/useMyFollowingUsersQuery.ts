import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { FollowDto } from "../../../types/domain/follow/FollowDto"

import { urls } from "../../../utils/urls"

export const useMyFollowingUsersQuery = () => {
  return useQuery<FollowDto[], AxiosError>([urls.api.myFollowingUsers])
}
