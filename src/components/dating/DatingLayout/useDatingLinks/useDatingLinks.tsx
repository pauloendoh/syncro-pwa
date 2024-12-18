import { urls } from '../../../../utils/urls/urls'
import MyIcons from '../../../_common/MyIcons/MyIcons'

export const useDatingLinks = () => {
  return [
    {
      href: urls.pages.dating.editDatingProfile(),
      title: 'Dating profile',
      icon: MyIcons.UserProfile,
    },
    {
      href: urls.pages.dating.people(),
      title: 'People',
      icon: MyIcons.People,
    },
    {
      href: urls.pages.dating.likedYou(),
      title: 'Liked you',
      icon: MyIcons.Heart,
    },

    {
      href: urls.pages.dating.chats(),
      title: 'Chats',
      icon: MyIcons.Chat,
    },
  ]
}
