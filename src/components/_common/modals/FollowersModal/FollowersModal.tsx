import { ActionIcon, Box, Modal, ScrollArea, Tabs } from '@mantine/core'
import { useEffect, useMemo, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { useFollowersQuery } from '../../../../hooks/react-query/follow/useFollowersQuery'
import { useFollowingUsersQuery } from '../../../../hooks/react-query/follow/useFollowingUsersQuery'
import { useMyRouterQuery } from '../../../../hooks/useMyRouterQuery'
import useFollowersModalStore from '../../../../hooks/zustand/modals/useFollowersModalStore'
import UserSearchItem from '../../../SearchPageContent/UserSearchResults/UserSearchItem/UserSearchItem'
import FlexCol from '../../flex/FlexCol'
import FlexVCenter from '../../flex/FlexVCenter'

const FollowersModal = () => {
  const { initialValue, closeModal } = useFollowersModalStore()

  const [tabIndex, setTabIndex] = useState(
    initialValue?.type === 'followers' ? 0 : 1
  )

  useEffect(() => {
    setTabIndex(initialValue?.type === 'followers' ? 0 : 1)
  }, [initialValue?.type])

  const { followModal } = useMyRouterQuery()

  const {
    data: followersFollows,
    isLoading: isLoadingFollowers,
    refetch: refetchFollowers,
  } = useFollowersQuery(initialValue?.userId)
  const {
    data: followingUsersFollows,
    isLoading: isLoadingFollowingUsers,
    refetch: refetchFollowingUsers,
  } = useFollowingUsersQuery(initialValue?.userId!)

  const isLoading = isLoadingFollowers || isLoadingFollowingUsers

  const userList = useMemo(() => {
    if (!followersFollows || !followingUsersFollows) return []

    if (tabIndex === 0) return followersFollows.map((f) => f.follower!)

    return followingUsersFollows.map((f) => f.followingUser!)
  }, [tabIndex, followersFollows, followingUsersFollows])

  return (
    <Modal
      opened={!!followModal}
      onClose={closeModal}
      size="sm"
      withCloseButton={false}
    >
      <Box>
        <Tabs
          styles={{
            tabsList: {
              overflowY: 'auto',
              flexWrap: 'unset',
              paddingBottom: 6,
              borderBottom: 'none',
            },
          }}
          value={String(tabIndex)}
          onTabChange={(newTabValue) => {
            setTabIndex(Number(newTabValue))
          }}
        >
          <FlexVCenter justify={'space-between'}>
            <Tabs.List>
              <Tabs.Tab value={'0'}>Followers</Tabs.Tab>
              <Tabs.Tab value={'1'}>Following</Tabs.Tab>
            </Tabs.List>
            <ActionIcon
              onClick={() => {
                closeModal()
              }}
            >
              <MdClose />
            </ActionIcon>
          </FlexVCenter>

          {!!userList.length && (
            <ScrollArea.Autosize mah={'calc(100vh - 168px)'}>
              <FlexCol gap={16} pt={24} pr={16}>
                {userList.map((user) => (
                  <UserSearchItem key={user.id} user={user} />
                ))}
              </FlexCol>
            </ScrollArea.Autosize>
          )}
        </Tabs>
      </Box>
    </Modal>
  )
}

export default FollowersModal
