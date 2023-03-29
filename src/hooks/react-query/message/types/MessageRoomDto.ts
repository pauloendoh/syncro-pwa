import { UserSimpleDto } from '../../../../types/domain/user/UserSimpleDto'
import { MessageDto } from './MessageDto'

export interface MessageRoomDto {
  id: string
  createdAt: string
  updatedAt: string
  users: UserSimpleDto[]

  messages?: MessageDto[]
}
