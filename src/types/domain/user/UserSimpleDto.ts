import { ProfileDto } from '../profile/ProfileDto'

export interface UserSimpleDto {
  id: string
  username: string
  email: string
  profile: ProfileDto
  isAdmin: boolean
}
