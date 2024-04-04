import qs from 'query-string'
import { ExploreSlug } from '../../hooks/useMyRouterQuery'
import { SearchParams } from '../../types/domain/search/SearchParams'
import {
  SyncroItemType,
  SyncroItemTypeAll,
} from '../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

import { MostRatedItemsQueryParams } from '../../hooks/react-query/rating/types/MostRatedItemsQueryParams'
import { ItemRatedByModalType } from '../../hooks/zustand/modals/useItemRatedByModalStore'
import { myEnvs } from '../myEnvs'
import { SettingsPageType } from './types/SettingsPageType'

const { NEXT_PUBLIC_API_URL: API_URL } = myEnvs

export const urls = {
  pages: {
    index: '/',
    signIn: '/auth',
    indexAndRedirectTo: (url: string) => `/?redirectTo=${url}`,
    signUp: '/auth?initialPage=signUp',
    syncroItem: (
      syncroItemId: string,
      extraParams?: {
        ratingDetailsId?: string
      }
    ) =>
      `/item?${qs.stringify({
        syncroItemId,
        ...extraParams,
      })}`,
    userProfile: (userId: string) => `/user/${userId}`,
    search: (params?: SearchParams) => {
      if (!params) return '/search'
      const query = qs.stringify(params)
      return `/search?${query}`
    },
    userItems: (userId: string, type: SyncroItemType) =>
      `/user/${userId}/items?type=${type}`, // PE 1/3 - does not use the type anymore

    savedItems: (type?: SyncroItemType) => '/saved?' + qs.stringify({ type }),
    explore: (exploreSlug: ExploreSlug = 'browse', queryObj?: Object) =>
      `/explore/${exploreSlug}?${qs.stringify(queryObj || {})}`,
    notifications: '/notifications',
    editProfile: '/edit-profile',
    messagesIndex: '/messages',
    messageRoom: (roomId: string) => `/messages/${roomId}`,

    settings: (page: SettingsPageType = 'account') => `/settings/${page}`,

    admin: () => '/admin',
  },
  api: {
    register: (pushToken: string | null) =>
      API_URL + '/auth/register?pushToken=' + pushToken,
    login: (pushToken: string | null) =>
      API_URL + `/auth/login?pushToken=${pushToken}`,
    tempUser: API_URL + '/auth/temp-user',
    authGoogleLogin: API_URL + '/auth/google/login',
    keepTempUser: API_URL + '/auth/keep-temp-user',

    me: API_URL + '/auth/me',

    search: (params: SearchParams) =>
      API_URL + '/search?' + qs.stringify(params),
    searchAll: (q: string) => API_URL + '/search-all?q=' + q,
    searchMore: (params: SearchParams) =>
      API_URL + '/search-more?' + qs.stringify(params),
    searchAutocomplete: (params: SearchParams) =>
      API_URL + '/search-autocomplete?' + qs.stringify(params),
    itemNews: (syncroItemId: string) =>
      `/item-news?syncroItemId=${syncroItemId}`,

    syncroItem: API_URL + `/syncro-item`,
    syncroItemDetails: (id?: string | null) =>
      API_URL + `/syncro-item?id=${id}`,
    updateItemAvgRating: (itemId: string) =>
      API_URL + `/syncro-item/rating?id=${itemId}`,
    syncroItemImage: (itemId: string) =>
      API_URL + `/syncro-item/${itemId}/image`,

    ratingId: (id: string) => API_URL + `/ratings?id=${id}`,
    myRatings: API_URL + `/me/ratings`,
    myRatingId: (id: string) => API_URL + `/me/ratings/` + id,
    ratingsByItem: (itemId: string, type: ItemRatedByModalType) =>
      API_URL + `/ratings-by-following-users?${qs.stringify({ itemId, type })}`,
    uploadFavoriteScene: API_URL + `/upload-favorite-scene`,

    myInterests: API_URL + `/me/interests`,
    toggleSaveItem: (itemId: string) =>
      API_URL + `/toggle-save/item?id=${itemId}`,
    plannedItems: (userId: string) =>
      API_URL + `/planned-items?userId=${userId}`,
    plannedItemsV2: (userId: string) =>
      API_URL + `/v2/planned-items?userId=${userId}`,

    updateSavedPosition: API_URL + `/update-saved-position`,
    updateSavedPositionV2: API_URL + `/v2/update-saved-position`,

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
    timelineHasNews: (userId?: string, lastRatingCreatedAt?: string) =>
      `/timeline-has-news?${qs.stringify({
        userId,
        lastRatingCreatedAt,
      })}`,

    userInfo: (userId: string) => API_URL + `/user/${userId}`,
    userItems: (userId: string, itemType?: SyncroItemType) =>
      API_URL + `/user/${userId}/items?itemType=${itemType}`,
    genresCount: (userId: string, type: SyncroItemType) =>
      API_URL + `/rated-genres-count?userId=${userId}&itemType=${type}`,
    mySimilarUsers: (itemType?: SyncroItemTypeAll) =>
      API_URL + `/me/similar-users?${qs.stringify({ itemType })}`,
    userSimilarity: (userId: string) => API_URL + `/user/${userId}/similarity`,
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

    usersToRecommend: (itemId: string) =>
      API_URL + `/users-to-recommend?itemId=${itemId}`,
    usersToRecommendV2: (itemId: string) =>
      API_URL + `/v2/users-to-recommend?itemId=${itemId}`,

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
    replyToRating: API_URL + `/reply-to-rating`,
    unreadMessagesRooms: API_URL + `/unread-messages-rooms`,
    messageRooms: API_URL + `/last-rooms-with-messages`,
    readAllMessages: (roomId: string) =>
      API_URL + `/read-all-messages?roomId=${roomId}`,
    feedback: API_URL + `/feedback`,

    webPushTest: API_URL + `/web-push`,
    webPushSubscribe: API_URL + `/web-push/subscribe`,

    settings: API_URL + `/settings`,

    reviewsByItemId: (itemId: string) => API_URL + `/reviews?itemId=${itemId}`,
    toggleFavoriteItem: (itemId: string) =>
      API_URL + `/toggle-favorite-item?itemId=${itemId}`,
    favoriteItems: (userId: string) =>
      API_URL + `/favorite-items?userId=${userId}`,

    uploadMalAnime: '/upload-mal-anime',
    confirmUploadMalAnime: '/upload-mal-anime/confirm',
    planUpdates: '/plan-updates',
    mostRatedItems: (params: MostRatedItemsQueryParams) =>
      '/most-rated-items?' + qs.stringify(params),
    itemRecommendationsForMe: (itemType: SyncroItemType) =>
      '/item-recommendations-for-me?' + qs.stringify({ itemType }),
    userRecommendationsForMe: '/user-recommendations-for-me',
    ignoreItemRecommendation: '/ignore-recommendation',
    importConnectors: '/import-connectors',
    importConnectorsValidate: (params: { connector: string; url: string }) =>
      `/import-connectors/validate?${qs.stringify(params)}`,

    amazonLinks: (itemId: string) => `/syncro-item/${itemId}/amazon-links`,
  },

  others: {
    imdbItem: (id: string) => `https://www.imdb.com${id}`,
    twitterIntent: (url: string, text: string) =>
      `https://twitter.com/intent/tweet?${qs.stringify({
        url,
        text,
      })}`,
  },
}

// todo
