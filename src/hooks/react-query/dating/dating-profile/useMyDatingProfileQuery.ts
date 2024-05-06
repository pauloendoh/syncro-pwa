import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { urls } from '../../../../utils/urls/urls'
import { useAxios } from '../../../../utils/useAxios'
import { DatingProfileDto } from './types/DatingProfileDto'

export const useMyDatingProfileQuery = () => {
  const axios = useAxios(false)

  return useQuery<DatingProfileDto, AxiosError>(
    [urls.api.dating.myDatingProfile],
    () => axios.get(urls.api.dating.myDatingProfile).then((res) => res.data),
    {
      refetchOnWindowFocus: false,
    }
  )
}
