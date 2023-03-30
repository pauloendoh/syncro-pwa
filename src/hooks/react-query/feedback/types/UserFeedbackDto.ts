export type UserFeedbackDto = {
  id: string
  createdAt: string
  updatedAt: string
  userId: string | null
  text: string
  rating: number
}

export const buildUserFeedbackDto = (
  p?: Partial<UserFeedbackDto>
): UserFeedbackDto => ({
  id: '',
  createdAt: '',
  updatedAt: '',
  userId: '',
  text: '',
  rating: 0,
  ...p,
})
