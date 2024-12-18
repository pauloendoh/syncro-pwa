import { UserSimpleDto } from '../../../../types/domain/user/UserSimpleDto'

export type SharedListDto = {
  id: string
  createdAt: Date
  updatedAt: Date
  creatorId: string
  title: string

  users: {
    user: UserSimpleDto
  }[]
}
