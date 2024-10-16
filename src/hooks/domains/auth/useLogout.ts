import { useRouter } from 'next/router'
import { urls } from '../../../utils/urls/urls'
import useConfirmationModalStore from '../../zustand/modals/useConfirmationModalStore'
import useAuthStore, { resetAuthStore } from '../../zustand/useAuthStore'

export const useLogout = (options?: { skipTempUserMessage: boolean }) => {
  // const { showSuccessToast } = useMyToast()
  // const axios = useAxios()

  const { authUser } = useAuthStore()
  const { openConfirmDialog } = useConfirmationModalStore()

  const router = useRouter()
  const logout = async () => {
    if (authUser?.userExpiresAt && !options?.skipTempUserMessage) {
      openConfirmDialog({
        title: 'Logout',
        description:
          'Are you sure you want to logout? You will lose your temporary user data.',
        onConfirm: () => {
          resetAuthStore()
          router.push(urls.pages.indexAndRedirectTo(router.asPath))
        },
      })

      return
    }

    resetAuthStore()
    router.push(urls.pages.indexAndRedirectTo(router.asPath))
  }

  return logout
}
