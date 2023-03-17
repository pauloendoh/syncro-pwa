import { Text, useMantineTheme } from '@mantine/core'
import { useMemo } from 'react'
import { useMySimilarUsersQuery } from '../../../types/domain/me/useMySimilarUsersQuery'
import { urls } from '../../../utils/urls'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import CenterLoader from '../../_common/overrides/CenterLoader/CenterLoader'
import MyNextLink from '../../_common/overrides/MyNextLink'
import UserProfilePicture from '../../_common/UserProfilePicture/UserProfilePicture'

interface Props {}

const SimilarUserList = (props: Props) => {
  const theme = useMantineTheme()

  const {
    data: ratingSimilarities,
    isLoading,
    refetch,
  } = useMySimilarUsersQuery()

  const sortedRatingSimilarities = useMemo(
    () =>
      ratingSimilarities?.sort((a, b) => {
        if (b.ratedSameItemsCount > a.ratedSameItemsCount) return 1
        return -1
      }) || [],
    [ratingSimilarities]
  )

  if (isLoading) return <CenterLoader />

  return (
    <FlexCol gap={16}>
      {sortedRatingSimilarities.map((item) => (
        <FlexVCenter>
          <MyNextLink href={urls.pages.user(item.userB.id)}>
            <UserProfilePicture userId={item.userB.id} widthHeigth={36} />
          </MyNextLink>

          <FlexCol ml={16}>
            <MyNextLink
              href={urls.pages.user(item.userB.id)}
              style={{
                color: 'inherit',
              }}
            >
              <Text weight={500}>{item.userB.username}</Text>
            </MyNextLink>
            <Text>
              {item.ratedSameItemsCount}{' '}
              {item.ratedSameItemsCount <= 1 ? 'item' : 'items'} ·{' '}
              {Math.floor(item.ratingsSimilarityAvgPercentage * 100)}% rating
              similarity
            </Text>
          </FlexCol>
        </FlexVCenter>
      ))}
    </FlexCol>
  )
}

export default SimilarUserList
