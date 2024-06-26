import { Button, Skeleton, Text } from '@mantine/core'
import { useMemo } from 'react'
import { syncroItemTypeOptions } from '../../../hooks/domains/syncro-item/syncroItemOptions/syncroItemOptions'
import { useUserHighSimilarityTypesQueryUtils } from '../../../hooks/react-query/rating/user-similarity/useUserHighSimilarityTypesQueryUtils'
import { useUserSimilarityQuery } from '../../../hooks/react-query/rating/user-similarity/useUserSimilarityQuery'
import useUserSimilarityModalStore from '../../../hooks/zustand/modals/useUserSimilarityModalStore'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'

type Props = {
  userId: string
}

const UserSimilaritySection = (props: Props) => {
  const { authUser } = useAuthStore()
  const { data, isLoading } = useUserSimilarityQuery(props.userId)
  const { openModal } = useUserSimilarityModalStore()

  const highSimilarityTypes = useUserHighSimilarityTypesQueryUtils(props.userId)

  const highSimilarityLabel = useMemo(() => {
    if (highSimilarityTypes.length === 0) return ''

    let label =
      syncroItemTypeOptions
        .find((o) => o.itemType === highSimilarityTypes[0])
        ?.getTypeLabel() || ''
    for (let i = 1; i < highSimilarityTypes.length; i++) {
      label += `, ${
        syncroItemTypeOptions
          .find((o) => o.itemType === highSimilarityTypes[i])
          ?.getTypeLabelLowerCase() || ''
      }`
    }

    return label
  }, [highSimilarityTypes])

  if (!authUser) {
    return null
  }

  if (!data || isLoading)
    return (
      <FlexVCenter gap={8}>
        <Skeleton h={64} w={160} />
      </FlexVCenter>
    )

  return (
    <FlexVCenter h={64} gap={16}>
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
            {data.allSimilarity.ratedSameItemsCount} shared items
          </Text>
        </FlexCol>
      </Button>

      {!!highSimilarityTypes.length && (
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
              High similarity
            </Text>
            <Text weight={'normal'}>{highSimilarityLabel}</Text>
          </FlexCol>
        </Button>
      )}
    </FlexVCenter>
  )
}

export default UserSimilaritySection
