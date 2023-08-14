import { Table } from '@mantine/core'
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

  return (
    <div className="UserItemsMdTable">
      <Table
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
        }}
        striped
      >
        <thead>
          <tr>
            <th />
            <th
              style={{
                width: '100%',
              }}
            >
              Title
            </th>
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
        </thead>
        <tbody>
          {props.items.map((item) => (
            <UserItemsMdTableRow
              item={item}
              key={item.id}
              thisIsYourList={props.thisIsYourList}
            />
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserItemsMdTable
