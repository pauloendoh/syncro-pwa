import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

export type SyncroItemTypeMapOption = {
  itemType: SyncroItemType
  labelPlural: string
  site: string
  tabIndex: number
  getTypeLabel: (isPlural?: boolean) => string
  getTypeLabelLowerCase: (isPlural?: boolean) => string
  planTo: string
  plansTo: string
  removeFromPlanTo: string
  inProgressLabel: string

  onboardingImageUrl: string
  onboardingSearchQuestion: string

  getVerb: () => string
}

export const syncroItemTypeOptions: SyncroItemTypeMapOption[] = [
  {
    itemType: 'movie',
    labelPlural: 'Movies',
    site: 'IMDb',
    tabIndex: 1,
    getTypeLabel: (isPlural = false) => (isPlural ? 'Movies' : 'Movie'),
    getTypeLabelLowerCase: (isPlural = false) =>
      isPlural ? 'movies' : 'movie',
    planTo: 'Plan to watch',
    plansTo: 'plans to watch',
    removeFromPlanTo: 'Remove from planned movies',
    inProgressLabel: 'watching',

    onboardingImageUrl:
      'https://i.pinimg.com/originals/92/5b/e4/925be4ac3d8c9edf287c2b0117f4e2db.jpg',
    onboardingSearchQuestion: 'What is one of your favorite movies?',

    getVerb: () => 'watch',
  },

  {
    itemType: 'tvSeries',
    labelPlural: 'TV Series',
    site: 'IMDb',
    tabIndex: 0,
    getTypeLabel: (isPlural = false) => (isPlural ? 'TV Series' : 'TV Series'),
    getTypeLabelLowerCase: (isPlural = false) =>
      isPlural ? 'TV series' : 'TV series',
    planTo: 'Plan to watch',
    plansTo: 'plans to watch',
    removeFromPlanTo: 'Remove from planned TV series',
    inProgressLabel: 'watching',

    onboardingImageUrl:
      'https://static.ffx.io/images/$zoom_0.369140625%2C$multiply_0.7725%2C$ratio_1.5%2C$width_756%2C$x_0%2C$y_0/t_crop_custom/q_86%2Cf_auto/45945ae17062bbcc507a504a27cedbf2b22ab8e1',
    onboardingSearchQuestion: 'What is one of your favorite TV series?',
    getVerb: () => 'watch',
  },

  {
    itemType: 'game',
    labelPlural: 'Games',
    site: 'IGDB',
    tabIndex: 3,
    getTypeLabel: (isPlural = false) => (isPlural ? 'Games' : 'Game'),
    getTypeLabelLowerCase: (isPlural = false) => (isPlural ? 'games' : 'game'),
    planTo: 'Plan to play',
    plansTo: 'plans to play',
    removeFromPlanTo: 'Remove from planned games',
    inProgressLabel: 'playing',
    onboardingImageUrl:
      'https://th-media.apjonlinecdn.com/magefan_blog/best-racing-games-to-play-for-pc-hero1561571168405232.jpg',
    onboardingSearchQuestion: 'What is one of your favorite games?',
    getVerb: () => 'play',
  },
  {
    itemType: 'manga',
    labelPlural: 'Manga',
    site: 'MAL',
    tabIndex: 4,
    getTypeLabel: (isPlural = false) => (isPlural ? 'Manga' : 'Manga'),
    getTypeLabelLowerCase: (isPlural = false) => (isPlural ? 'manga' : 'manga'),
    planTo: 'Plan to read',
    plansTo: 'plans to read',
    removeFromPlanTo: 'Remove from planned manga',
    inProgressLabel: 'reading',

    onboardingImageUrl:
      'https://gogonihon.com/wp-content/uploads/2019/06/Manga-1-min.jpg',
    onboardingSearchQuestion: 'What is one of your favorite manga?',
    getVerb: () => 'read',
  },
  {
    itemType: 'book',
    labelPlural: 'Books',
    site: 'OpenLibrary',
    tabIndex: 2,
    getTypeLabel: (isPlural = false) => (isPlural ? 'Books' : 'Book'),
    getTypeLabelLowerCase: (isPlural = false) => (isPlural ? 'books' : 'book'),
    planTo: 'Plan to read',
    plansTo: 'plans to read',
    removeFromPlanTo: 'Remove from planned books',
    inProgressLabel: 'reading',

    onboardingImageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMQV-HY00kL5Zu_FokWEcmvPz04WkOgH-IfVcXoQ4tcE1cY2TQ6MzrailPUYcNPmywGCo&usqp=CAU',
    onboardingSearchQuestion: 'What is one of your favorite books?',
    getVerb: () => 'read',
  },
  {
    itemType: 'music',
    labelPlural: 'Music',
    site: 'Youtube',
    tabIndex: 5,
    getTypeLabel: (isPlural?: boolean) => {
      return 'Music'
    },
    getTypeLabelLowerCase: (isPlural?: boolean) => {
      return 'music'
    },
    planTo: 'Plan to listen',
    plansTo: 'plans to listen',
    removeFromPlanTo: 'Remove from planned music',
    inProgressLabel: 'listening',

    onboardingImageUrl: 'https://i.ytimg.com/vi/5qap5aO4i9A/maxresdefault.jpg',
    onboardingSearchQuestion: 'What is one of your favorite songs?',
    getVerb: () => 'listen',
  },
]
