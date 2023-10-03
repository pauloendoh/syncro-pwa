import { Box, Flex, Text } from '@mantine/core'
import { useMemo } from 'react'
import { useQueryParams } from '../../../hooks/useQueryParams'
import { useMySimilarUsersQuery } from '../../../types/domain/me/useMySimilarUsersQuery'
import { urls } from '../../../utils/urls/urls'
import FollowUnfollowButton from '../../UserProfilePage/ProfileScreenButtons/FollowUnfollowButton/FollowUnfollowButton'
import UserProfilePicture from '../../_common/UserProfilePicture/UserProfilePicture'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import CenterLoader from '../../_common/overrides/CenterLoader/CenterLoader'
import MyNextLink from '../../_common/overrides/MyNextLink'
import Span from '../../_common/text/Span'
import ItemTypeSelector from '../MostRatedExploreSection/ItemTypeSelector/ItemTypeSelector'
import { getRatingSimilarityLabel as getRatingSimilarityLabels } from './getRatingSimilarityLabel/getRatingSimilarityLabel'

const RatingSimilarityList = () => {
  const { queryValue, setQuery } = useQueryParams().itemType

  const { data: ratingSimilarities, isLoading } = useMySimilarUsersQuery(
    queryValue || 'all'
  )

  const sortedRatingSimilarities = useMemo(
    () =>
      ratingSimilarities?.sort((a, b) => {
        if (b.ratedSameItemsCount > a.ratedSameItemsCount) return 1
        return -1
      }) || [],
    [ratingSimilarities]
  )

  return (
    <FlexCol gap={16}>
      <ItemTypeSelector
        includeAll
        value={queryValue || 'all'}
        onChange={(value) => {
          setQuery(value, { replace: true })
        }}
        label="Item type"
        width={120}
      />

      {isLoading && <CenterLoader />}

      {!isLoading && sortedRatingSimilarities.length === 0 && (
        <Span>No similar users found</Span>
      )}

      {sortedRatingSimilarities.map((item) => {
        const { countLabel, similarityLabel } = getRatingSimilarityLabels({
          similarityDto: item,
        })
        return (
          <FlexVCenter>
            <MyNextLink href={urls.pages.userProfile(item.userB.id)}>
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

                  <Text>{countLabel}</Text>
                  <Text>{similarityLabel}</Text>
                </FlexCol>

                <FollowUnfollowButton profileUserId={item.userB.id} />
              </Flex>
            </Box>
          </FlexVCenter>
        )
      })}
    </FlexCol>
  )
}

export default RatingSimilarityList
