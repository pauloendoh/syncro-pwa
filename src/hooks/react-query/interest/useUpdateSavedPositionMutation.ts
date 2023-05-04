import { useDebouncedValue } from '@mantine/hooks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { InterestDto } from '../../../types/domain/interest/InterestDto'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'

const useUpdateSavedPositionMutation = () => {
  const queryClient = useQueryClient()

  const axios = useAxios()

  const [succededAt, setSuccededAt] = useState('')

  const [debouncedSuccededAt] = useDebouncedValue(succededAt, 1000)

  useEffect(() => {
    if (debouncedSuccededAt) {
      myNotifications.success('Saved!')
    }
  }, [debouncedSuccededAt])

  return useMutation(
    async (payload: { interestId: string; newPosition: number }) => {
      queryClient.setQueryData<InterestDto[]>(
        [urls.api.findSavedItems],
        (curr) => {
          if (!curr) return []

          // reorder using position and splice
          const interestToMove = curr.find(
            (interest) => interest.id === payload.interestId
          )
          if (!interestToMove) return curr

          const itemType = interestToMove.syncroItem?.type
          const selectedInterests = curr.filter(
            (interest) => interest.syncroItem?.type === itemType
          )

          const otherInterests = curr.filter(
            (interest) => interest.syncroItem?.type !== itemType
          )

          const updatedInterests = selectedInterests.filter(
            (interest) => interest.id !== payload.interestId
          )

          updatedInterests.splice(payload.newPosition - 1, 0, interestToMove)

          return [
            ...updatedInterests.map((n, index) => ({
              ...n,
              position: index + 1,
            })),
            ...otherInterests,
          ]
        }
      )
      return axios
        .post(urls.api.updateSavedPosition, payload)
        .then((res) => res.data)
    },
    {
      onSuccess: async (_) => {
        // await queryClient.invalidateQueries([urls.api.findSavedItems])
        setSuccededAt(new Date().toISOString())
      },
    }
  )
}

export default useUpdateSavedPositionMutation
