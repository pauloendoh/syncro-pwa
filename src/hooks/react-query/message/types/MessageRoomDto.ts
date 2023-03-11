import { UserSimpleDto } from '../../../../types/domain/user/UserSimpleDto'

export interface MessageRoomDto {
  id: string
  createdAt: string
  updatedAt: string
  users: UserSimpleDto[]
}
