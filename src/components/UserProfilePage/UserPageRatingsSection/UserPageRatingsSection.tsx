import { Box, Menu, Title } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import {
  MdCalendarViewMonth,
  MdOutlineKeyboardArrowDown,
  MdOutlineViewStream,
} from 'react-icons/md'
import { useTimelineRatingsQuery } from '../../../hooks/react-query/feed/useHomeRatingsQuery'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import FeedSettingsIcon from '../../HomePage/FeedSettingsIconButton/FeedSettingsIconButton'
import RatingsTimeline from '../../HomePage/RatingsTimeline/RatingsTimeline'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import UserRatingsGridView from './UserRatingsGridView/UserRatingsGridView'

type Props = {
  userId: string
}

type FeedView = 'card' | 'grid'

const UserPageRatingsSection = (props: Props) => {
  const [feedView, setFeedView] = useLocalStorage<FeedView>({
    key: 'feed-view',
    defaultValue: 'card',
  })

  const { data: homeRatings } = useTimelineRatingsQuery(props.userId)

  const { isMobile } = useMyMediaQuery()

  if (!homeRatings || homeRatings.pages[0].length === 0) return null

  return (
    <FlexCol>
      <FlexVCenter justify="space-between">
        <Title order={4}>Last ratings</Title>

        <FlexVCenter gap={8}>
          <FeedSettingsIcon />
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
                {feedView === 'grid' && <MdCalendarViewMonth size={24} />}
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
                onClick={() => setFeedView('grid')}
                icon={<MdCalendarViewMonth size={24} />}
              >
                Grid
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </FlexVCenter>
      </FlexVCenter>

      {feedView === 'card' && (
        <Box ml={isMobile ? 0 : 16}>
          <RatingsTimeline userId={props.userId} />
        </Box>
      )}

      {feedView === 'grid' && <UserRatingsGridView userId={props.userId} />}
    </FlexCol>
  )
}

export default UserPageRatingsSection
