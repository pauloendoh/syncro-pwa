import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { UserSimpleDto } from "../../../types/domain/user/UserSimpleDto"

import { urls } from "../../../utils/urls"

export const useUserInfoQuery = (userId: string) => {
  return useQuery<UserSimpleDto, AxiosError>([urls.api.userInfo(userId)])
}
