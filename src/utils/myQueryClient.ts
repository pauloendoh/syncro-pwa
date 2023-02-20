import { QueryClient, QueryFunction } from '@tanstack/react-query'
import { useState } from 'react'
import { useAxios } from './useAxios'

export const useMyQueryClient = () => {
  const axios = useAxios()
  const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
    const { data } = await axios.get(String(queryKey[0]))
    return data
  }

  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          queryFn: defaultQueryFn,
        },
      },
    })
  )

  return queryClient
}
