import { IconBaseProps } from 'react-icons'
import { SearchParams } from '../../../types/domain/search/SearchParams'
import { SyncroItemBaseIcon } from '../../HomePage/HomeRatingItem/SyncroItemIcon/SyncroItemIcon'
import MyIcons from '../../_common/MyIcons/MyIcons'

export const searchTabOptions: {
  key: SearchParams['type']
  label: string
  Icon: React.ComponentType<IconBaseProps>
}[] = [
  {
    key: 'all',
    label: 'All',
    Icon: MyIcons.Fire,
  },
  {
    key: 'movie',
    label: 'Movies',
    Icon: SyncroItemBaseIcon.movie,
  },
  {
    key: 'tvSeries',
    label: 'TV Series',
    Icon: SyncroItemBaseIcon.tvSeries,
  },

  {
    key: 'game',
    label: 'Games',
    Icon: SyncroItemBaseIcon.game,
  },
  {
    key: 'manga',
    label: 'Manga',
    Icon: SyncroItemBaseIcon.manga,
  },

  {
    key: 'goodreadsBook',
    label: 'Books',
    Icon: SyncroItemBaseIcon.book,
  },

  {
    key: 'users',
    label: 'Users',
    Icon: MyIcons.UserOutline,
  },
]
