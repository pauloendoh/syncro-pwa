import { useMutation } from '@tanstack/react-query'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'

const useDidNotFindMutation = () => {
  const axios = useAxios()

  return useMutation(
    (payload: { query: string; type: string }) =>
      axios.post(urls.api.didNotFind, payload).then((res) => res.data),
    {
      onSuccess: (_, payload) => {
        myNotifications.success(
          `Thanks for your feedback! We'll try to add ${payload.type} "${payload.query}" soon!`
        )
      },
    }
  )
}

export default useDidNotFindMutation
