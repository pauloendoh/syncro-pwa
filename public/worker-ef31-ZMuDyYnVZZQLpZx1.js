(()=>{"use strict";var e=[,(e,t,r)=>{r.r(t),r.d(t,{webPushMessageTypes:()=>o});const o={newMessage:"new-message"}},(e,t,r)=>{r.r(t),r.d(t,{urls:()=>l});var o=r(3),n=r(4),s=r(9);function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}const{NEXT_PUBLIC_API_URL:a}=s.myEnvs,l={pages:{index:"/",indexAndRedirectTo:e=>`/?redirectTo=${e}`,signUp:"/?initialPage=signUp",syncroItem:(e,t)=>`/item?${n.default.stringify(function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){(0,o.default)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({syncroItemId:e},t))}`,user:e=>`/user/${e}`,search:e=>{if(!e)return"/search";return`/search?${n.default.stringify(e)}`},userItems:(e,t)=>`/user/${e}/items?type=${t}`,savedItems:e=>"/saved?"+n.default.stringify({type:e}),explore:(e="for-you",t)=>`/explore/${e}?${n.default.stringify(t||{})}`,notifications:"/notifications",editProfile:"/edit-profile",messagesIndex:"/messages",messageRoom:e=>`/messages/${e}`,settings:(e="account")=>`/settings/${e}`},api:{register:e=>a+"/auth/register?pushToken="+e,login:e=>a+`/auth/login?pushToken=${e}`,tempUser:a+"/auth/temp-user",authGoogleLogin:a+"/auth/google/login",me:a+"/auth/me",search:e=>a+"/search?"+n.default.stringify(e),searchAll:e=>a+"/search-all?q="+e,searchMore:e=>a+"/search-more?"+n.default.stringify(e),searchAutocomplete:e=>a+"/search-autocomplete?"+n.default.stringify(e),syncroItem:a+"/syncro-item",syncroItemDetails:e=>a+`/syncro-item?id=${e}`,updateItemAvgRating:e=>a+`/syncro-item/rating?id=${e}`,syncroItemImage:e=>a+`/syncro-item/${e}/image`,ratingId:e=>a+`/ratings?id=${e}`,myRatings:a+"/me/ratings",myRatingId:e=>a+"/me/ratings/"+e,ratingByItemAndFollowingUsers:e=>a+`/ratings-by-following-users?itemId=${e}`,uploadFavoriteScene:a+"/upload-favorite-scene",myInterests:a+"/me/interests",toggleSaveItem:e=>a+`/toggle-save/item?id=${e}`,plannedItems:e=>a+`/planned-items?userId=${e}`,updateSavedPosition:a+"/update-saved-position",userRatings:e=>a+`/user/${e}/ratings`,checkMalUser:e=>a+`/check-mal/${e}`,confirmAndStartAnimeImport:e=>a+`/confirm-and-start-anime-import/${e}`,importItemsByRequestId:e=>a+`/import-request/${e}/import-items`,userInterests:e=>a+`/user/${e}/interests`,apiImages:e=>a+`/public/images/${e}`,timelineItems:e=>{const{page:t,pageSize:r,userId:o}=e;return a+`/feed/timeline-items?page=${t}&pageSize=${r}&userId=${o||""}`},timelineHasNews:(e,t)=>`/timeline-has-news?userId=${e}&lastRatingCreatedAt=${t}`,userInfo:e=>a+`/user/${e}`,userItems:(e,t)=>a+`/user/${e}/items?itemType=${t}`,genresCount:(e,t)=>a+`/rated-genres-count?userId=${e}&itemType=${t}`,mySimilarUsers:a+"/me/similar-users",userSimilarity:e=>a+`/user/${e}/similarity`,myFollowingUsers:a+"/me/following-users",userFollowers:e=>a+`/user/${e}/followers`,userFollowingUsers:e=>a+`/user/${e}/following-users`,toggleFollow:e=>a+`/user/${e}/toggle-follow`,profilePicture:a+"/profiles/picture",myProfile:a+"/me/profile",customPositionsByItemType:e=>a+`/custom-positions?itemType=${e}`,customPosition:a+"/custom-positions",mostFollowedUsers:a+"/follow/most-followed-users",newUsers:a+"/new-users",notifications:a+"/notifications",hideNotificationDots:a+"/notifications/hide-dots",usersToRecommend:e=>a+`/users-to-recommend?itemId=${e}`,usersAlsoLiked:e=>a+`/users-also-liked?itemId=${e}`,recommendItem:(e,t)=>a+`/recommend-item?itemId=${e}&userId=${t}`,recommendationsFromMe:a+"/item-recommendations-from-me",userItemsCount:e=>a+`/user/${e}/items-count`,itemsToRecommendToUser:(e,t)=>a+`/items-to-recommend-to-user?userId=${e}&itemType=${t}`,sendPasswordResetEmail:a+"/auth/password-reset-email",confirmPasswordResetCode:a+"/auth/confirm-password-reset-code",endPasswordReset:a+"/auth/end-password-reset",logoutPushToken:e=>a+`/me/push-token/${e}`,didNotFind:a+"/did-not-find",youtubeVideos:e=>a+`/youtube-videos?itemId=${e}`,mangaPanels:e=>a+`/manga-panels?itemId=${e}`,messageRoomByUserId:e=>a+`/message-room?userId=${e}`,messageRoomByRoomId:e=>a+`/message-room?roomId=${e}`,messagesByRoomId:e=>a+`/messages?roomId=${e}`,sendMessage:a+"/message",replyToRating:a+"/reply-to-rating",unreadMessagesRooms:a+"/unread-messages-rooms",lastRoomsWithMessages:a+"/last-rooms-with-messages",readAllMessages:e=>a+`/read-all-messages?roomId=${e}`,feedback:a+"/feedback",webPushTest:a+"/web-push",webPushSubscribe:a+"/web-push/subscribe",settings:a+"/settings",reviewsByItemId:e=>a+`/reviews?itemId=${e}`,toggleFavoriteItem:e=>a+`/toggle-favorite-item?itemId=${e}`,favoriteItems:e=>a+`/favorite-items?userId=${e}`,uploadMalAnime:"/upload-mal-anime",confirmUploadMalAnime:"/upload-mal-anime/confirm",planUpdates:"/plan-updates",mostRatedItems:e=>"/most-rated-items?"+n.default.stringify(e),itemRecommendationsForMe:e=>"/item-recommendations-for-me?"+n.default.stringify({itemType:e})},others:{imdbItem:e=>`https://www.imdb.com${e}`,twitterIntent:(e,t)=>`https://twitter.com/intent/tweet?${n.default.stringify({url:e,text:t})}`}}},(e,t,r)=>{function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.r(t),r.d(t,{default:()=>o})},(e,t,r)=>{r.r(t),r.d(t,{default:()=>o});const o=r(5)},(e,t,r)=>{r.r(t),r.d(t,{exclude:()=>j,extract:()=>h,parse:()=>w,parseUrl:()=>$,pick:()=>O,stringify:()=>I,stringifyUrl:()=>v});var o=r(3),n=r(6),s=r(7),i=r(8);function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){(0,o.default)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}const c=e=>null==e,u=e=>encodeURIComponent(e).replace(/[!'()*]/g,(e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`)),d=Symbol("encodeFragmentIdentifier");function m(e){if("string"!=typeof e||1!==e.length)throw new TypeError("arrayFormatSeparator must be single character string")}function f(e,t){return t.encode?t.strict?u(e):encodeURIComponent(e):e}function p(e,t){return t.decode?(0,n.default)(e):e}function g(e){return Array.isArray(e)?e.sort():"object"==typeof e?g(Object.keys(e)).sort(((e,t)=>Number(e)-Number(t))).map((t=>e[t])):e}function y(e){const t=e.indexOf("#");return-1!==t&&(e=e.slice(0,t)),e}function b(e,t){return t.parseNumbers&&!Number.isNaN(Number(e))&&"string"==typeof e&&""!==e.trim()?e=Number(e):!t.parseBooleans||null===e||"true"!==e.toLowerCase()&&"false"!==e.toLowerCase()||(e="true"===e.toLowerCase()),e}function h(e){const t=(e=y(e)).indexOf("?");return-1===t?"":e.slice(t+1)}function w(e,t){m((t=l({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},t)).arrayFormatSeparator);const r=function(e){let t;switch(e.arrayFormat){case"index":return(e,r,o)=>{t=/\[(\d*)]$/.exec(e),e=e.replace(/\[\d*]$/,""),t?(void 0===o[e]&&(o[e]={}),o[e][t[1]]=r):o[e]=r};case"bracket":return(e,r,o)=>{t=/(\[])$/.exec(e),e=e.replace(/\[]$/,""),t?void 0!==o[e]?o[e]=[...o[e],r]:o[e]=[r]:o[e]=r};case"colon-list-separator":return(e,r,o)=>{t=/(:list)$/.exec(e),e=e.replace(/:list$/,""),t?void 0!==o[e]?o[e]=[...o[e],r]:o[e]=[r]:o[e]=r};case"comma":case"separator":return(t,r,o)=>{const n="string"==typeof r&&r.includes(e.arrayFormatSeparator),s="string"==typeof r&&!n&&p(r,e).includes(e.arrayFormatSeparator);r=s?p(r,e):r;const i=n||s?r.split(e.arrayFormatSeparator).map((t=>p(t,e))):null===r?r:p(r,e);o[t]=i};case"bracket-separator":return(t,r,o)=>{const n=/(\[])$/.test(t);if(t=t.replace(/\[]$/,""),!n)return void(o[t]=r?p(r,e):r);const s=null===r?[]:r.split(e.arrayFormatSeparator).map((t=>p(t,e)));void 0!==o[t]?o[t]=[...o[t],...s]:o[t]=s};default:return(e,t,r)=>{void 0!==r[e]?r[e]=[...[r[e]].flat(),t]:r[e]=t}}}(t),o=Object.create(null);if("string"!=typeof e)return o;if(!(e=e.trim().replace(/^[?#&]/,"")))return o;for(const n of e.split("&")){if(""===n)continue;const e=t.decode?n.replace(/\+/g," "):n;let[i,a]=(0,s.default)(e,"=");void 0===i&&(i=e),a=void 0===a?null:["comma","separator","bracket-separator"].includes(t.arrayFormat)?a:p(a,t),r(p(i,t),a,o)}for(const[e,r]of Object.entries(o))if("object"==typeof r&&null!==r)for(const[e,o]of Object.entries(r))r[e]=b(o,t);else o[e]=b(r,t);return!1===t.sort?o:(!0===t.sort?Object.keys(o).sort():Object.keys(o).sort(t.sort)).reduce(((e,t)=>{const r=o[t];return Boolean(r)&&"object"==typeof r&&!Array.isArray(r)?e[t]=g(r):e[t]=r,e}),Object.create(null))}function I(e,t){if(!e)return"";m((t=l({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},t)).arrayFormatSeparator);const r=r=>t.skipNull&&c(e[r])||t.skipEmptyString&&""===e[r],o=function(e){switch(e.arrayFormat){case"index":return t=>(r,o)=>{const n=r.length;return void 0===o||e.skipNull&&null===o||e.skipEmptyString&&""===o?r:null===o?[...r,[f(t,e),"[",n,"]"].join("")]:[...r,[f(t,e),"[",f(n,e),"]=",f(o,e)].join("")]};case"bracket":return t=>(r,o)=>void 0===o||e.skipNull&&null===o||e.skipEmptyString&&""===o?r:null===o?[...r,[f(t,e),"[]"].join("")]:[...r,[f(t,e),"[]=",f(o,e)].join("")];case"colon-list-separator":return t=>(r,o)=>void 0===o||e.skipNull&&null===o||e.skipEmptyString&&""===o?r:null===o?[...r,[f(t,e),":list="].join("")]:[...r,[f(t,e),":list=",f(o,e)].join("")];case"comma":case"separator":case"bracket-separator":{const t="bracket-separator"===e.arrayFormat?"[]=":"=";return r=>(o,n)=>void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?o:(n=null===n?"":n,0===o.length?[[f(r,e),t,f(n,e)].join("")]:[[o,f(n,e)].join(e.arrayFormatSeparator)])}default:return t=>(r,o)=>void 0===o||e.skipNull&&null===o||e.skipEmptyString&&""===o?r:null===o?[...r,f(t,e)]:[...r,[f(t,e),"=",f(o,e)].join("")]}}(t),n={};for(const[t,o]of Object.entries(e))r(t)||(n[t]=o);const s=Object.keys(n);return!1!==t.sort&&s.sort(t.sort),s.map((r=>{const n=e[r];return void 0===n?"":null===n?f(r,t):Array.isArray(n)?0===n.length&&"bracket-separator"===t.arrayFormat?f(r,t)+"[]":n.reduce(o(r),[]).join("&"):f(r,t)+"="+f(n,t)})).filter((e=>e.length>0)).join("&")}function $(e,t){var r,o,n;t=l({decode:!0},t);let[i,a]=(0,s.default)(e,"#");return void 0===i&&(i=e),l({url:null!==(r=null===(o=i)||void 0===o||null===(n=o.split("?"))||void 0===n?void 0:n[0])&&void 0!==r?r:"",query:w(h(e),t)},t&&t.parseFragmentIdentifier&&a?{fragmentIdentifier:p(a,t)}:{})}function v(e,t){t=l({encode:!0,strict:!0,[d]:!0},t);const r=y(e.url).split("?")[0]||"";let o=I(l(l({},w(h(e.url),{sort:!1})),e.query),t);o&&(o=`?${o}`);let n=function(e){let t="";const r=e.indexOf("#");return-1!==r&&(t=e.slice(r)),t}(e.url);if(e.fragmentIdentifier){const o=new URL(r);o.hash=e.fragmentIdentifier,n=t[d]?o.hash:`#${e.fragmentIdentifier}`}return`${r}${o}${n}`}function O(e,t,r){r=l({parseFragmentIdentifier:!0,[d]:!1},r);const{url:o,query:n,fragmentIdentifier:s}=$(e,r);return v({url:o,query:(0,i.includeKeys)(n,t),fragmentIdentifier:s},r)}function j(e,t,r){return O(e,Array.isArray(t)?e=>!t.includes(e):(e,r)=>!t(e,r),r)}},(e,t,r)=>{r.r(t),r.d(t,{default:()=>l});const o="%[a-f0-9]{2}",n=new RegExp("("+o+")|([^%]+?)","gi"),s=new RegExp("("+o+")+","gi");function i(e,t){try{return[decodeURIComponent(e.join(""))]}catch(e){}if(1===e.length)return e;t=t||1;const r=e.slice(0,t),o=e.slice(t);return Array.prototype.concat.call([],i(r),i(o))}function a(e){try{return decodeURIComponent(e)}catch(t){let r=e.match(n)||[];for(let t=1;t<r.length;t++)r=(e=i(r,t).join("")).match(n)||[];return e}}function l(e){if("string"!=typeof e)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof e+"`");try{return decodeURIComponent(e)}catch(t){return function(e){const t={"%FE%FF":"��","%FF%FE":"��"};let r=s.exec(e);for(;r;){try{t[r[0]]=decodeURIComponent(r[0])}catch(e){const o=a(r[0]);o!==r[0]&&(t[r[0]]=o)}r=s.exec(e)}t["%C2"]="�";const o=Object.keys(t);for(const r of o)e=e.replace(new RegExp(r,"g"),t[r]);return e}(e)}}},(e,t,r)=>{function o(e,t){if("string"!=typeof e||"string"!=typeof t)throw new TypeError("Expected the arguments to be of type `string`");if(""===e||""===t)return[];const r=e.indexOf(t);return-1===r?[]:[e.slice(0,r),e.slice(r+t.length)]}r.r(t),r.d(t,{default:()=>o})},(e,t,r)=>{function o(e,t){const r={};if(Array.isArray(t))for(const o of t){const t=Object.getOwnPropertyDescriptor(e,o);null!=t&&t.enumerable&&Object.defineProperty(r,o,t)}else for(const o of Reflect.ownKeys(e)){const n=Object.getOwnPropertyDescriptor(e,o);if(n.enumerable){t(o,e[o],e)&&Object.defineProperty(r,o,n)}}return r}function n(e,t){if(Array.isArray(t)){const r=new Set(t);return o(e,(e=>!r.has(e)))}return o(e,((e,r,o)=>!t(e,r,o)))}r.r(t),r.d(t,{excludeKeys:()=>n,includeKeys:()=>o})},(e,t,r)=>{r.r(t),r.d(t,{myEnvs:()=>o});const o={NEXT_PUBLIC_API_URL:(0,r(10).toStringOrThrowError)("http://localhost:3000")}},(e,t,r)=>{r.r(t),r.d(t,{toStringOrThrowError:()=>o});const o=e=>{if(void 0===e)throw new Error("Value is undefined");return e}},(e,t,r)=>{function o(){console.log("Hello from util."),console.log("es6+ syntax test:");let e={message:"working"};console.log(null==e?void 0:e.message)}r.r(t),r.d(t,{util:()=>o})}],t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,r),s.exports}r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};(()=>{r.r(o);var e=r(1),t=r(2);(0,r(11).util)(),self.addEventListener("message",(e=>{console.log(null==e?void 0:e.data)})),self.addEventListener("push",(async e=>{const t=JSON.parse((null==e?void 0:e.data.text())||"{}");await self.clients.matchAll({type:"window",includeUncontrolled:!0}).then((function(e){if(e.length>0)for(let t=0;t<e.length;t++)if(e[t].focused)return!0;return!1}))||null==e||e.waitUntil(self.registration.showNotification(t.title,{body:t.body,icon:"/icon-192x192.png",badge:"/icon-192x192.png",tag:t.type}).then((()=>{})))})),self.addEventListener("notificationclick",(r=>{var o,n;null==r||r.notification.close();const s=JSON.parse((null==r||null===(o=r.notification)||void 0===o||null===(n=o.data)||void 0===n?void 0:n.text())||"{}");if((null==s?void 0:s.type)!==e.webPushMessageTypes.newMessage)null==r||r.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:!0}).then((function(e){if(e.length>0){let t=e[0];for(let r=0;r<e.length;r++)e[r].focused&&(t=e[r]);return t.focus()}return self.clients.openWindow("/")})));else{const e=null==s?void 0:s.data;if(!e)return;const o=e.roomId;null==r||r.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:!0}).then((function(e){if(e.length>0){let r=e[0];for(let n=0;n<e.length;n++)e[n].focused&&e[n].url===t.urls.pages.messageRoom(o)&&(r=e[n]);return r.focus()}return self.clients.openWindow(t.urls.pages.messageRoom(o))})))}}))})()})();