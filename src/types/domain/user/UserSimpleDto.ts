import { ProfileDto, buildProfileDto } from '../profile/ProfileDto'

export interface UserSimpleDto {
  id: string
  username: string
  email: string
  profile: ProfileDto
  isAdmin: boolean
}

export const buildUserSimpleDto = (
  p?: Partial<UserSimpleDto>
): UserSimpleDto => ({
  id: '',
  username: '',
  email: '',
  profile: buildProfileDto(),
  isAdmin: false,

  ...p,
})
