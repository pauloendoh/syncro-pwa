import { Button, Text } from '@mantine/core'
import { useUserSimilarityQuery } from '../../../hooks/react-query/rating/user-similarity/useUserSimilarityQuery'
import useUserSimilarityModalStore from '../../../hooks/zustand/modals/useUserSimilarityModalStore'
import FlexCol from '../../_common/flex/FlexCol'

type Props = {
  userId: string
}

const UserSimilaritySection = (props: Props) => {
  const { data } = useUserSimilarityQuery(props.userId)
  const { openModal } = useUserSimilarityModalStore()

  if (!data) return null
  return (
    <>
      <Button
        variant="subtle"
        styles={{
          root: {
            width: 'fit-content',
            height: 'fit-content',
          },
        }}
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
    </>
  )
}

export default UserSimilaritySection
