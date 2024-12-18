import { Box, Flex, useMantineTheme } from '@mantine/core'
import { textContainsWords } from 'endoh-utils'
import { useMemo, useState } from 'react'
import { TableVirtuoso } from 'react-virtuoso'
import { useAuthUser } from '../../../hooks/domains/auth/useAuthUser'
import { ParsedSharedListItemDto } from '../../../hooks/react-query/shared-list/types/ParsedSharedListItemDto'
import { SharedListDto } from '../../../hooks/react-query/shared-list/types/SharedListDto'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import { SyncroItemTypeAll } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import FlexCol from '../../_common/flex/FlexCol'
import UserImage from '../../_common/image/SyncroItemImage/UserImage/UserImage'
import MyTextInput from '../../_common/inputs/MyTextInput'
import ItemTypeSelector from '../../ExplorePageContent/BrowseItemsExploreSection/ItemTypeSelector/ItemTypeSelector'
import { SharedListTableRow } from './SharedListTableRow/SharedListTableRow'

type Props = {
  selectedList: SharedListDto
  items: ParsedSharedListItemDto[]
  tableType: 'Interest' | 'Entries'
}

export const SharedListTable = ({ ...props }: Props) => {
  const [selectedItemType, setSelectedItemType] =
    useState<SyncroItemTypeAll>('movie')
  const [filterByText, setFilterByText] = useState('')

  const parsedItems = useMemo(() => {
    return props.items
      .map((item) => {
        const interestCount = item.interests.length
        const interestSum = item.interests.reduce(
          (acc, interest) => acc + interest.interest,
          0
        )
        const averageInterest =
          interestCount > 0 ? interestSum / interestCount : 0

        return {
          ...item,
          averageInterest,
        }
      })
      .filter((item) => {
        if (selectedItemType === 'all') {
          return true
        }
        return item.item.type === selectedItemType
      })
      .filter((item) => {
        if (filterByText === '') {
          return true
        }
        return textContainsWords(item.item.title, filterByText)
      })
      .sort((a, b) => {
        return b.averageInterest - a.averageInterest
      })
  }, [props.items, selectedItemType, filterByText])

  const authUser = useAuthUser()

  const myUser = props.selectedList.users?.find(
    (user) => user.user.id === authUser?.id
  )?.user

  const otherUsers = props.selectedList.users
    .map((user) => user.user)
    .filter((user) => user.id !== authUser?.id)

  const theme = useMantineTheme()

  const { isMobile } = useMyMediaQuery()

  if (!authUser || !myUser) {
    return null
  }

  return (
    <FlexCol gap={24}>
      <Flex gap={16}>
        <ItemTypeSelector
          onlyValidItemTypes
          includeAll
          value={selectedItemType}
          onChange={setSelectedItemType}
          label="Item type"
          width={180}
        />

        <MyTextInput
          key={'anything'}
          value={filterByText}
          label="Search by title"
          onChange={(e) => setFilterByText(e.target.value)}
          sx={{
            width: '-webkit-fill-available',
          }}
        />
      </Flex>
      <Box
        className="UserItemsMdTable"
        sx={{
          fontSize: 12,

          table: {
            border: '1px solid #444 !important',
          },

          '& td': {
            borderTop: '1px solid #444 !important',
          },

          'td, th': {
            padding: '0.4375rem 0.625rem',
          },

          // second td, th
          '& td:nth-child(2), & th:nth-child(2)': {
            maxWidth: isMobile ? 112 : '100%',
            minWidth: isMobile ? 112 : '100%',
          },

          th: {
            backgroundColor: theme.colors.dark[6],
          },
        }}
      >
        <TableVirtuoso
          data={parsedItems}
          useWindowScroll
          fixedHeaderContent={() => (
            <tr>
              <th />
              <th align="left">Title</th>
              <th align="center">Average interest</th>
              <th align="center">
                <UserImage
                  userIdForLink={myUser?.id}
                  pictureUrl={myUser?.profile.pictureUrl}
                  widthHeight={32}
                />
              </th>
              {otherUsers.map((user) => (
                <th align="center">
                  <UserImage
                    userIdForLink={user.id}
                    pictureUrl={user.profile.pictureUrl}
                    widthHeight={32}
                  />
                </th>
              ))}
            </tr>
          )}
          itemContent={(index, data) => (
            <SharedListTableRow
              data={data}
              key={data.item.id}
              myUser={myUser}
              otherUsers={otherUsers}
              sharedList={props.selectedList}
              showItemType={selectedItemType === 'all'}
            />
          )}
        />
      </Box>
    </FlexCol>
  )
}
