import { Menu, Title } from '@mantine/core'
import { useState } from 'react'
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineViewModule,
  MdOutlineViewStream,
} from 'react-icons/md'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import RatingsTimeline from '../../HomePageContent/RatingsTimeline/RatingsTimeline'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import UserRatingsGridView from './UserRatingsGridView/UserRatingsGridView'

type Props = {
  userId: string
}

type FeedView = 'card' | 'list'

const UserPageRatingsSection = (props: Props) => {
  const { isMobile } = useMyMediaQuery()

  const [feedView, setFeedView] = useState<FeedView>('card')

  return (
    <FlexCol>
      <FlexVCenter justify="space-between">
        <Title order={4}>Last ratings</Title>

        <Menu position="bottom-end">
          <Menu.Target>
            <FlexVCenter
              px={8}
              py={4}
              gap={4}
              sx={{
                cursor: 'pointer',
              }}
            >
              {feedView === 'card' && <MdOutlineViewStream size={24} />}
              {feedView === 'list' && <MdOutlineViewModule size={24} />}
              <MdOutlineKeyboardArrowDown />
            </FlexVCenter>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={() => setFeedView('card')}
              icon={<MdOutlineViewStream size={24} />}
            >
              Card
            </Menu.Item>
            <Menu.Item
              onClick={() => setFeedView('list')}
              icon={<MdOutlineViewModule size={24} />}
            >
              List
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </FlexVCenter>

      {feedView === 'card' && <RatingsTimeline userId={props.userId} />}
      {feedView === 'list' && <UserRatingsGridView userId={props.userId} />}
    </FlexCol>
  )
}

export default UserPageRatingsSection
