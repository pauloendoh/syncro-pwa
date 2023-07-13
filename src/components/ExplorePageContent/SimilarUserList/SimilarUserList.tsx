import { Text } from '@mantine/core'
import { useMemo } from 'react'
import { useMySimilarUsersQuery } from '../../../types/domain/me/useMySimilarUsersQuery'
import { urls } from '../../../utils/urls'
import UserProfilePicture from '../../_common/UserProfilePicture/UserProfilePicture'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import MyNextLink from '../../_common/overrides/MyNextLink'
import { getRatingSimilarityLabel } from './getRatingSimilarityLabel/getRatingSimilarityLabel'

const SimilarUserList = () => {
  const { data: ratingSimilarities, isLoading } = useMySimilarUsersQuery()

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
            <Text>{getRatingSimilarityLabel({ similarityDto: item })}</Text>
          </FlexCol>
        </FlexVCenter>
      ))}
    </FlexCol>
  )
}

export default SimilarUserList
