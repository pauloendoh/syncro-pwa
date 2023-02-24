import { ProfileDto } from '../../../domains/profile/ProfileDto'

export interface UserSimpleDto {
  id: string
  username: string
  email: string
  profile: ProfileDto
}
