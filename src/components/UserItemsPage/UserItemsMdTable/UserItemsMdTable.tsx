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
        '& td:nth-child(3), & td:nth-child(4), & th:nth-child(3), & th:nth-child(4)':
          {
            textAlign: 'center',
          },

        '& td, & th': {
          borderTop: 'none !important',
        },
        '& th': {
          borderBottom: 'none !important',
        },
        'tbody > tr:nth-child(odd)': {
          backgroundColor: theme.colors.dark[5],
        },
        'td, th': {
          padding: '0.4375rem 0.625rem',
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
                />
              </th>
            )}
            <th>
              <UserImage
                widthHeight={32}
                pictureUrl={authUserInfo?.profile.pictureUrl}
              />
            </th>
          </tr>
        )}
        itemContent={(index, item) => (
          <UserItemsMdTableRow
            item={item}
            key={item.id}
            thisIsYourList={props.thisIsYourList}
          />
        )}
      />
    </Box>
  )
}

export default UserItemsMdTable
