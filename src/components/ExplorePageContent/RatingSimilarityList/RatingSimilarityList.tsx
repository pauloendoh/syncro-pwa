import { Box, Flex, Progress, Select, Text } from '@mantine/core'
import { useMemo, useState } from 'react'
import { useQueryParams } from '../../../hooks/useQueryParams'
import { useMySimilarUsersQuery } from '../../../types/domain/me/useMySimilarUsersQuery'
import { urls } from '../../../utils/urls/urls'
import FollowUnfollowButton from '../../UserProfilePage/ProfileScreenButtons/FollowUnfollowButton/FollowUnfollowButton'
import UserProfilePicture from '../../_common/UserProfilePicture/UserProfilePicture'
import FlexCol from '../../_common/flex/FlexCol'
import CenterLoader from '../../_common/overrides/CenterLoader/CenterLoader'
import MyNextLink from '../../_common/overrides/MyNextLink'
import Span from '../../_common/text/Span'
import ItemTypeSelector from '../BrowseItemsExploreSection/ItemTypeSelector/ItemTypeSelector'
import { getRatingSimilarityLabel as getRatingSimilarityLabels } from './getRatingSimilarityLabel/getRatingSimilarityLabel'

type SortBy = 'items count' | 'rating similarity'

const RatingSimilarityList = () => {
  const { queryValue, setQuery } = useQueryParams().itemType

  const { data: ratingSimilarities, isLoading } = useMySimilarUsersQuery(
    queryValue || 'all'
  )

  const [sortBy, setSortBy] = useState<SortBy>('items count')

  const sortedRatingSimilarities = useMemo(() => {
    if (!ratingSimilarities) return []

    if (sortBy === 'items count') {
      return ratingSimilarities.sort((a, b) => {
        if (b.ratedSameItemsCount > a.ratedSameItemsCount) return 1
        return -1
      })
    }
    return ratingSimilarities.sort((a, b) => {
      if (b.overallPercentage > a.overallPercentage) return 1
      return -1
    })
  }, [ratingSimilarities, sortBy])

  return (
    <FlexCol gap={16} maw={480}>
      <Flex gap={16}>
        <ItemTypeSelector
          includeAll
          value={queryValue || 'all'}
          onChange={(value) => {
            setQuery(value, { replace: true })
          }}
          label="Item type"
          width={120}
        />

        <Select
          label="Sort by"
          data={[
            { value: 'items count', label: 'Items count' },
            { value: 'rating similarity', label: 'Rating similarity' },
          ]}
          value={sortBy}
          onChange={(value: SortBy) => {
            setSortBy(value)
          }}
          w={160}
        />
      </Flex>

      {isLoading && <CenterLoader />}

      {!isLoading && sortedRatingSimilarities.length === 0 && (
        <Span>
          <b>No similar users found.</b> Come back after rating some items!
        </Span>
      )}

      {sortedRatingSimilarities.map((item) => {
        const { countLabel, similarityLabel, isHighSimilarity } =
          getRatingSimilarityLabels({
            similarityDto: item,
          })
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
                  <MyNextLink
                    href={urls.pages.userProfile(item.userB.id)}
                    style={{
                      color: 'inherit',
                    }}
                  >
                    <Text weight={500}>{item.userB.username}</Text>
                  </MyNextLink>

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

                <Box mt={8}>
                  <FollowUnfollowButton profileUserId={item.userB.id} />
                </Box>
              </Flex>
            </Box>
          </Flex>
        )
      })}
    </FlexCol>
  )
}

export default RatingSimilarityList
