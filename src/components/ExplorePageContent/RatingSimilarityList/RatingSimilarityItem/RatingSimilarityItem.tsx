import { Box, Flex, Progress, Text } from '@mantine/core'
import { useMemo } from 'react'
import { useMyFollowingUsersQuery } from '../../../../hooks/react-query/follow/useMyFollowingUsersQuery'
import { RatingSimilarityByTypeDto } from '../../../../types/domain/rating/RatingSimilarityByTypeDto'
import { urls } from '../../../../utils/urls/urls'
import FlexCol from '../../../_common/flex/FlexCol'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import MyNextLink from '../../../_common/overrides/MyNextLink'
import UserProfilePicture from '../../../_common/UserProfilePicture/UserProfilePicture'
import { getRatingSimilarityLabel as getRatingSimilarityLabels } from '../getRatingSimilarityLabel/getRatingSimilarityLabel'

type Props = {
  item: RatingSimilarityByTypeDto
}

const RatingSimilarityItem = ({ item }: Props) => {
  const { countLabel, similarityLabel, isHighSimilarity } =
    getRatingSimilarityLabels({
      similarityDto: item,
    })

  const { data: followingData } = useMyFollowingUsersQuery()

  const youreFollowing = useMemo(() => {
    if (!followingData) return false

    return followingData.find((f) => f.followingUserId === item.userB.id)
  }, [followingData])

  return (
    <Flex key={item.userB.id}>
      <MyNextLink
        href={urls.pages.userProfile(item.userB.id)}
        style={{
          marginTop: 8,
        }}
      >
        <UserProfilePicture userId={item.userB.id} widthHeigth={36} />
      </MyNextLink>

      <Box
        ml={16}
        sx={{
          flexGrow: 1,
        }}
      >
        <Flex justify={'space-between'}>
          <FlexCol>
            <FlexVCenter>
              <MyNextLink
                href={urls.pages.userProfile(item.userB.id)}
                style={{
                  color: 'inherit',
                }}
              >
                <Text weight={500}>{item.userB.username}</Text>
              </MyNextLink>
              {youreFollowing && (
                <Text
                  size="xs"
                  color="grey"
                  style={{
                    marginLeft: 4,
                  }}
                >
                  (following)
                </Text>
              )}
            </FlexVCenter>

            <Text>{countLabel.replace('item', 'shared item')}</Text>
            <div
              style={{
                position: 'relative',
                marginTop: 4,
              }}
            >
              <Progress
                size="xl"
                radius={0}
                w="160px"
                sections={[
                  {
                    value: item.overallPercentage * 100,
                    color: isHighSimilarity ? 'secondary' : 'grey',
                  },
                ]}
                sx={{
                  height: 24,
                }}
              />
              <Text
                style={{
                  position: 'absolute',
                  left: 4,
                  top: 2,
                  borderBottom: '1px dotted white',
                  cursor: 'help',
                }}
                size="xs"
                color="white"
                title={`${similarityLabel} ${
                  isHighSimilarity
                    ? '(high similarity: over 50% and at least 10 shared items)'
                    : ''
                }`}
              >
                {Math.round(item.overallPercentage * 100)}%
              </Text>
            </div>
          </FlexCol>
        </Flex>
      </Box>
    </Flex>
  )
}

export default RatingSimilarityItem
