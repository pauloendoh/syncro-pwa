import { Flex, Text, useMantineTheme } from '@mantine/core'
import Image from 'next/image'
import { IImdbResultItem } from '../../../../types/domain/movie/MovieResultResponseDto'
import { getSyncroItemImageOrDefault } from '../../../../utils/image/getSyncroItemImageOrDefault'
import { urls } from '../../../../utils/urls'
import FlexCol from '../../../_common/flex/FlexCol'
import MyNextLink from '../../../_common/overrides/MyNextLink'

interface Props {
  resultItem: IImdbResultItem
}

// PE 1/3 - unificar no SyncroSearchItem
const ImdbSearchItem = ({ resultItem }: Props) => {
  const theme = useMantineTheme()

  // const { data: myRatings } = useMyRatingsQuery()
  // const { data: myInterests } = useMyInterestsQuery()

  // const myRatingValue = useMemo(
  //   () =>
  //     myRatings?.find((rating) => rating.syncroItemId === resultItem.id)
  //       ?.ratingValue || null,
  //   [myRatings, resultItem.id]
  // )

  // const myInterestLevel = useMemo(
  //   () =>
  //     myInterests?.find((interest) => interest.syncroItemId === resultItem.id)
  //       ?.interestLevel || null,
  //   [myInterests, resultItem.id]
  // )

  return (
    <Flex gap={16}>
      <MyNextLink href={urls.pages.syncroItem(resultItem.id)}>
        <Image
          src={getSyncroItemImageOrDefault(resultItem?.image?.url)}
          width={100}
          height={100}
          alt={resultItem.title}
        />
      </MyNextLink>

      <FlexCol>
        <MyNextLink href={urls.pages.syncroItem(resultItem.id)}>
          <Text
            sx={(theme) => ({
              color: theme.colors.dark[0],
              fontWeight: 500,
            })}
          >
            {resultItem.title} {resultItem.year && `(${resultItem.year})`}
          </Text>
        </MyNextLink>

        <Flex mt={2}>
          <FlexCol style={{ width: 120 }}>
            {/* {resultItem.syncroItem ? (
                <SearchItemImdbSection
                  avgRating={resultItem.syncroItem?.avgRating}
                  ratingCount={resultItem.syncroItem?.ratingCount}
                />
              ) : (
                <Text>See details</Text>
              )} */}
          </FlexCol>
          {/* <FlexCol style={{ width: 120 }}>
              {Boolean(myRatingValue || myInterestLevel) && (
                <SearchItemYourSection itemId={resultItem.id} />
              )}
            </FlexCol> */}
        </Flex>
      </FlexCol>
    </Flex>
  )
}

export default ImdbSearchItem
