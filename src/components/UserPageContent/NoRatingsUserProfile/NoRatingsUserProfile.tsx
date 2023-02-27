import { Center, Text } from '@mantine/core'
import { useEffect } from 'react'
import { useUserRatingsQuery } from '../../../hooks/react-query/rating/useUserRatingsQuery'

type Props = {
  userId: string
}

const NoRatingsUserProfile = (props: Props) => {
  const { refetch } = useUserRatingsQuery(props.userId)
  useEffect(() => {
    refetch()
  }, [])
  return (
    <Center sx={{ height: 80 }}>
      <Text>No ratings yet</Text>
    </Center>
  )
}

export default NoRatingsUserProfile
