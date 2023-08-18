import { useQuery } from '@tanstack/react-query'

import { urls } from '../../../utils/urls'
import useAuthStore from '../../zustand/useAuthStore'
import { ImportConnectorsDto } from './types/UserFeedbackDto'

export const useImportConnectorsQuery = () => {
  const { authUser } = useAuthStore()
  return useQuery<ImportConnectorsDto, Error>([urls.api.importConnectors], {
    enabled: !!authUser,
  })
}
