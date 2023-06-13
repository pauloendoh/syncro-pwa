import { Button, Skeleton, Text } from '@mantine/core'
import { useUserSimilarityQuery } from '../../../hooks/react-query/rating/user-similarity/useUserSimilarityQuery'
import useUserSimilarityModalStore from '../../../hooks/zustand/modals/useUserSimilarityModalStore'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'

type Props = {
  userId: string
}

const UserSimilaritySection = (props: Props) => {
  const { data, isLoading } = useUserSimilarityQuery(props.userId)
  const { openModal } = useUserSimilarityModalStore()

  if (!data || isLoading)
    return (
      <FlexVCenter gap={8}>
        <Skeleton h={64} w={160} />
        {/* <Skeleton h={64} />
        <Skeleton h={64} /> */}
      </FlexVCenter>
    )

  return (
    <FlexVCenter h={64}>
      <Button
        variant="subtle"
        styles={{
          root: {
            width: 'fit-content',
            height: 'fit-content',
          },
        }}
        py={4}
        color="dark"
        onClick={() => openModal(props.userId)}
      >
        <FlexCol>
          <Text
            sx={{
              fontSize: '1.1rem',
            }}
          >
            {(data.allSimilarity.overallPercentage * 100).toFixed(0)}%
            similarity
          </Text>
          <Text weight={'normal'}>
            {data.allSimilarity.ratedSameItemsCount} common items
          </Text>
        </FlexCol>
      </Button>
    </FlexVCenter>
  )
}

export default UserSimilaritySection
