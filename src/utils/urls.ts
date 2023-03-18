import queryString from 'query-string'
import { ExploreSlug } from '../hooks/useMyRouterQuery'
import { SearchParams } from '../types/domain/search/SearchParams'
import { SyncroItemType } from '../types/domain/syncro-item/SyncroItemType/SyncroItemType'

import { myEnvs } from './myEnvs'

const { NEXT_PUBLIC_API_URL: API_URL } = myEnvs

export const urls = {
  pages: {
    index: '/',
    syncroItem: (id: string) => `/item?syncroItemId=${id}`,
    user: (userId: string) => `/user/${userId}`,
    search: (params: SearchParams) => {
      const query = queryString.stringify(params)
      return `/search?${query}`
    },
    userItems: (userId: string, type: SyncroItemType) =>
      `/user/${userId}/items?type=${type}`, // PE 1/3 - does not use the type anymore

    savedItems: (type: SyncroItemType | 'all') => '/saved?type=' + type,
    explore: (exploreSlug: ExploreSlug) => `/explore/${exploreSlug}`,
    notifications: '/notifications',
    editProfile: '/edit-profile',
    messageRoom: (roomId: string) => `/messages/${roomId}`,
  },
  api: {
    register: (pushToken: string | null) =>
      API_URL + '/auth/register?pushToken=' + pushToken,
    login: (pushToken: string | null) =>
      API_URL + `/auth/login?pushToken=${pushToken}`,
    tempUser: API_URL + '/auth/temp-user',

    me: API_URL + '/auth/me',

    search: (params: SearchParams) =>
      API_URL + '/search?' + queryString.stringify(params),
    searchMore: (params: SearchParams) =>
      API_URL + '/search-more?' + queryString.stringify(params),

    syncroItemDetails: (id?: string | null) =>
      API_URL + `/syncro-item?id=${id}`,
    updateItemAvgRating: (itemId: string) =>
      API_URL + `/syncro-item/rating?id=${itemId}`,

    myRatings: API_URL + `/me/ratings`,
    myRatingId: (id: string) => API_URL + `/me/ratings/` + id,
    ratingByItemAndFollowingUsers: (itemId: string) =>
      API_URL + `/ratings-by-following-users?itemId=${itemId}`,

    myInterests: API_URL + `/me/interests`,
    toggleSaveItem: (itemId: string) =>
      API_URL + `/toggle-save/item?id=${itemId}`,
    findSavedItems: API_URL + `/saved-items`,
    findSavedItemsByType: (type: SyncroItemType) =>
      API_URL + `/saved-items?type=${type}`,
    updateSavedPosition: API_URL + `/update-saved-position`,

    userRatings: (userId: string) => API_URL + `/user/${userId}/ratings`,
    checkMalUser: (username: string) => API_URL + `/check-mal/${username}`,
    confirmAndStartAnimeImport: (username: string) =>
      API_URL + `/confirm-and-start-anime-import/${username}`,
    importItemsByRequestId: (requestId: string) =>
      API_URL + `/import-request/${requestId}/import-items`,

    userInterests: (userId: string) => API_URL + `/user/${userId}/interests`,

    apiImages: (imageName: string) => API_URL + `/public/images/${imageName}`,
    timelineItems: (params: {
      page: number
      pageSize: number
      userId?: string
    }) => {
      const { page, pageSize, userId } = params

      return (
        API_URL +
        `/feed/timeline-items?page=${page}&pageSize=${pageSize}&userId=${
          userId || ''
        }`
      )
    },
    userInfo: (userId: string) => API_URL + `/user/${userId}`,
    userItems: (userId: string, itemType: SyncroItemType) =>
      API_URL + `/user/${userId}/items?itemType=${itemType}`,
    mySimilarUsers: API_URL + `/me/similar-users`,
    myFollowingUsers: API_URL + `/me/following-users`,
    userFollowers: (userId: string) => API_URL + `/user/${userId}/followers`,
    userFollowingUsers: (userId: string) =>
      API_URL + `/user/${userId}/following-users`,
    toggleFollow: (userId: string) => API_URL + `/user/${userId}/toggle-follow`,

    profilePicture: API_URL + '/profiles/picture',
    myProfile: API_URL + '/me/profile',

    customPositionsByItemType: (itemType: SyncroItemType) =>
      API_URL + `/custom-positions?itemType=${itemType}`,
    customPosition: API_URL + `/custom-positions`,
    mostFollowedUsers: API_URL + `/follow/most-followed-users`,
    newUsers: API_URL + `/new-users`,
    notifications: API_URL + `/notifications`,
    hideNotificationDots: API_URL + `/notifications/hide-dots`,

    mutualsSavedItem: (itemId: string) =>
      API_URL + `/me/mutuals/saved-item?itemId=${itemId}`,

    usersAlsoLiked: (itemId: string) =>
      API_URL + `/users-also-liked?itemId=${itemId}`,
    recommendItem: (itemId: string, userId: string) =>
      API_URL + `/recommend-item?itemId=${itemId}&userId=${userId}`,
    recommendationsFromMe: API_URL + `/item-recommendations-from-me`,

    userItemsCount: (userId: string) => API_URL + `/user/${userId}/items-count`,
    itemsToRecommendToUser: (userId: string, itemType: SyncroItemType) =>
      API_URL +
      `/items-to-recommend-to-user?userId=${userId}&itemType=${itemType}`,

    sendPasswordResetEmail: API_URL + `/auth/password-reset-email`,
    confirmPasswordResetCode: API_URL + `/auth/confirm-password-reset-code`,
    endPasswordReset: API_URL + `/auth/end-password-reset`,
    logoutPushToken: (pushToken: string) =>
      API_URL + `/me/push-token/${pushToken}`,

    didNotFind: API_URL + `/did-not-find`,
    youtubeVideos: (itemId: string) =>
      API_URL + `/youtube-videos?itemId=${itemId}`,
    mangaPanels: (itemId: string) => API_URL + `/manga-panels?itemId=${itemId}`,

    messageRoomByUserId: (userId: string) =>
      API_URL + `/message-room?userId=${userId}`,
    messageRoomByRoomId: (roomId: string) =>
      API_URL + `/message-room?roomId=${roomId}`,
    messagesByRoomId: (roomId: string) =>
      API_URL + `/messages?roomId=${roomId}`,
    sendMessage: API_URL + `/message`,
  },

  others: {
    imdbItem: (id: string) => `https://www.imdb.com${id}`,
  },
}
