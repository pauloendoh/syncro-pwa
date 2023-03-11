import { UserSimpleDto } from '../../../../types/domain/user/UserSimpleDto'

export interface MessageDto {
  id: string
  createdAt: string
  updatedAt: string
  roomId: string
  userId: string
  text: string
  user: UserSimpleDto
}
