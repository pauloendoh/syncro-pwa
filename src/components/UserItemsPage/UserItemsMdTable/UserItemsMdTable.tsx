import { Box, useMantineTheme } from '@mantine/core'
import { TableVirtuoso } from 'react-virtuoso'
import { useUserInfoQuery } from '../../../hooks/react-query/user/useUserInfoQuery'
import { useMyRouterQuery } from '../../../hooks/useMyRouterQuery'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import { UserItemDto } from '../../../types/domain/syncro-item/UserItemDto'
import UserImage from '../../_common/image/SyncroItemImage/UserImage/UserImage'
import UserItemsMdTableRow from './UserItemsMdTableRow/UserItemsMdTableRow'

type Props = {
  items: UserItemDto[]
  thisIsYourList: boolean
}

const UserItemsMdTable = ({ ...props }: Props) => {
  const { userId } = useMyRouterQuery()
  const { data: userInfo } = useUserInfoQuery(userId)

  const { authUser } = useAuthStore()
  const { data: authUserInfo } = useUserInfoQuery(authUser?.id)
  const theme = useMantineTheme()

  return (
    <Box
      className="UserItemsMdTable"
      sx={{
        '& table': {
          maxWidth: 480,
        },
        '& td:nth-child(3), & td:nth-child(4), & th:nth-child(3), & th:nth-child(4)':
          {
            textAlign: 'center',
          },
        table: {
          border: '1px solid #444 !important',
        },

        '& td': {
          borderTop: '1px solid #444 !important',
        },

        'td, th': {
          padding: '0.4375rem 0.625rem',
        },
        '& td:nth-child(2), & th:nth-child(2)': {
          paddingLeft: '0.3125rem',
        },
        th: {
          backgroundColor: theme.colors.dark[6],
        },
      }}
    >
      <TableVirtuoso
        // sx={{
        //   '& td:nth-child(3), & td:nth-child(4), & th:nth-child(3), & th:nth-child(4)':
        //     {
        //       textAlign: 'center',
        //     },

        //   '& td, & th': {
        //     borderTop: 'none !important',
        //   },
        //   '& th': {
        //     borderBottom: 'none !important',
        //   },
        // }}
        // striped
        data={props.items}
        useWindowScroll
        fixedHeaderContent={() => (
          <tr>
            <th />
            <th align="left">Title</th>
            {!props.thisIsYourList && (
              <th>
                <UserImage
                  widthHeight={32}
                  pictureUrl={userInfo?.profile.pictureUrl}
                  userIdForLink={userInfo?.id}
                />
              </th>
            )}
            {authUserInfo && (
              <th>
                <UserImage
                  widthHeight={32}
                  pictureUrl={authUserInfo.profile.pictureUrl}
                  userIdForLink={authUserInfo.id}
                />
              </th>
            )}
          </tr>
        )}
        itemContent={(index, item) => (
          <UserItemsMdTableRow
            item={item}
            key={item.id}
            thisIsYourList={props.thisIsYourList}
            isLoggedIn={!!authUser}
          />
        )}
      />
    </Box>
  )
}

export default UserItemsMdTable
