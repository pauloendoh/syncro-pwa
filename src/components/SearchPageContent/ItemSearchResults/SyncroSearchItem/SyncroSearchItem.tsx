import { Flex, Text, useMantineTheme } from '@mantine/core'
import Image from 'next/image'
import { SyncroItemDto } from '../../../../hooks/react-query/syncro-item/SyncroItemDto'
import { getSyncroItemImageOrDefault } from '../../../../utils/image/getSyncroItemImageOrDefault'
import { urls } from '../../../../utils/urls'
import FlexCol from '../../../_common/flex/FlexCol'
import MyNextLink from '../../../_common/overrides/MyNextLink'

interface Props {
  item: SyncroItemDto
}

// PE 1/3 - unificar no SyncroSearchItem
const SyncroSearchItem = ({ item }: Props) => {
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
      <MyNextLink href={urls.pages.syncroItem(item.id)}>
        <Image
          src={getSyncroItemImageOrDefault(item?.imageUrl)}
          width={100}
          height={100}
          alt={item.title}
        />
      </MyNextLink>

      <FlexCol>
        <MyNextLink href={urls.pages.syncroItem(item.id)}>
          <Text
            sx={(theme) => ({
              color: theme.colors.dark[0],
              fontWeight: 500,
            })}
          >
            {item.title} {item.year && `(${item.year})`}
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

export default SyncroSearchItem
