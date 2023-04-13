import { Title } from '@mantine/core'
import { useLastRoomsWithMessagesQuery } from '../../../hooks/react-query/message/useLastRoomsWithMessagesQuery'
import { useUnreadMessageRoomsQuery } from '../../../hooks/react-query/message/useUnreadMessageRoomsQuery'
import { useMyRouterQuery } from '../../../hooks/useMyRouterQuery'
import FlexCol from '../../_common/flex/FlexCol'
import MessagesSidebarItem from './MessagesSidebarItem/MessagesSidebarItem'

type Props = {}

const MessagesSidebar = (props: Props) => {
  const { data: rooms } = useLastRoomsWithMessagesQuery()
  const { roomId } = useMyRouterQuery()
  const { data: unreadRooms } = useUnreadMessageRoomsQuery()

  return (
    <FlexCol p={16}>
      <Title order={5}>Messages</Title>

      <FlexCol>
        {rooms?.map((room) => (
          <MessagesSidebarItem
            key={room.id}
            room={room}
            isSelected={room.id === roomId}
            unread={unreadRooms?.some(
              (unreadRoom) => unreadRoom.id === room.id
            )}
          />
        ))}
      </FlexCol>
    </FlexCol>
  )
}

export default MessagesSidebar
