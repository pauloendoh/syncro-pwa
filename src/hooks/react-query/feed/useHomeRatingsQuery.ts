import { useInfiniteQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { RatingDto } from '../../../types/domains/rating/RatingDto'

import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'

const PAGE_SIZE = 10

export const useHomeRatingsQuery = (currentPage: number) => {
  const axios = useAxios()
  const fetcher = async ({ pageParam = 1 }) => {
    const data = await axios
      .get<RatingDto[]>(urls.api.homeRatings(pageParam, PAGE_SIZE))
      .then((res) => res.data)
    return data
  }
  return useInfiniteQuery<RatingDto[], AxiosError>(['home-ratings'], fetcher, {
    getNextPageParam: (lastPageData) => {
      if (lastPageData.length < PAGE_SIZE) {
        return undefined
      }
      return currentPage + 1
    },
    refetchOnWindowFocus: false,
  })
}
