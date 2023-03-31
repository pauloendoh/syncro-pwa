// for react-query
export const queryKeys = {
  timelineItems: (userId?: string) => ['timelineItems', userId],
  messageRoom: (roomId: string) => ['messageRoom', roomId],
}
