import { Modal, ScrollArea, Title } from '@mantine/core'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { MdAdd } from 'react-icons/md'
import { useAuthUser } from '../../../../hooks/domains/auth/useAuthUser'
import { useCreateSharedListMutation } from '../../../../hooks/react-query/shared-list/useCreateSharedListMutation'
import { useSharedListsIncludingUsersQuery } from '../../../../hooks/react-query/shared-list/useSharedListsIncludingUsersQuery'
import { useUserInfoQuery } from '../../../../hooks/react-query/user/useUserInfoQuery'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import { useModalZIndex } from '../../../../hooks/utils/useModalZIndex'
import { useUserSharedListsWithYouModalStore } from '../../../../hooks/zustand/modals/useUserSharedListsWithYouModalStore '
import { urls } from '../../../../utils/urls/urls'
import FlexCol from '../../flex/FlexCol'
import MyLoadingButton from '../../overrides/MyLoadingButton'
import { SharedListLinkButton } from './SharedListLinkButton/SharedListLinkButton'

export const UserSharedListsWithYouModal = () => {
  const {
    isOpen,
    closeModal,
    userId: selectedUserId,
  } = useUserSharedListsWithYouModalStore()

  const zIndex = useModalZIndex({ isOpen })

  const { isMobile } = useMyMediaQuery()

  const { data: userInfo } = useUserInfoQuery(selectedUserId)

  const title = useMemo(() => {
    if (!userInfo) {
      return 'Loading...'
    }

    return `${userInfo.username}'s shared lists with you`
  }, [userInfo])

  const { mutate: submitCreateSharedList, isLoading: isLoadingSubmit } =
    useCreateSharedListMutation()
  const authUser = useAuthUser()

  const router = useRouter()

  const { data: items, isLoading: isLoadingItems } =
    useSharedListsIncludingUsersQuery([selectedUserId, authUser?.id ?? ''])

  return (
    <Modal
      size="sm"
      opened={isOpen}
      onClose={closeModal}
      title={<Title order={4}>{title}</Title>}
      styles={{
        overlay: {
          zIndex,
        },
        inner: {
          zIndex,
        },
      }}
      scrollAreaComponent={isMobile ? undefined : ScrollArea.Autosize}
    >
      <FlexCol gap={16}>
        <FlexCol>
          {items?.map((item) => (
            <SharedListLinkButton
              item={item}
              key={item.id}
              onClick={closeModal}
            />
          ))}
        </FlexCol>
        {!isLoadingItems && (
          <MyLoadingButton
            loading={isLoadingSubmit}
            width={'100%'}
            leftIcon={<MdAdd />}
            onClick={() => {
              const title = prompt('Enter the title of the new shared list')
              console.log({
                title,
                authUser,
                selectedUserId,
              })
              if (title && authUser) {
                submitCreateSharedList(
                  {
                    title,
                    userIds: [selectedUserId, authUser.id],
                  },
                  {
                    onSuccess: (saved) => {
                      closeModal()
                      router.push(urls.pages.sharedList.id(saved.id))
                    },
                  }
                )
              } else {
                alert('Title is required')
              }
            }}
          >
            New shared list with pauloendoh
          </MyLoadingButton>
        )}
      </FlexCol>
    </Modal>
  )
}
