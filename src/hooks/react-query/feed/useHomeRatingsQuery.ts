import { useInfiniteQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { RatingDto } from '../../../types/domain/rating/RatingDto'
import { queryKeys } from '../../../utils/queryKeys'

import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'

const PAGE_SIZE = 10

export const useTimelineRatingsQuery = (userId?: string) => {
  const axios = useAxios()
  const fetcher = async ({ pageParam = 1 }) => {
    const data = await axios
      .get<RatingDto[]>(
        urls.api.timelineItems({
          page: pageParam,
          pageSize: PAGE_SIZE,
          userId,
        })
      )
      .then((res) => res.data)
    return data
  }
  return useInfiniteQuery<RatingDto[], AxiosError>(
    queryKeys.timelineItems(userId),
    fetcher,
    {
      getNextPageParam: (lastPageData, pages) => {
        if (lastPageData.length < PAGE_SIZE) {
          return undefined
        }
        return pages.length + 1
      },
      refetchOnWindowFocus: false,
    }
  )
}
