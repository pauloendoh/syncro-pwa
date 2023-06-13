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

export function isUserSimpleDto(obj: object): obj is UserSimpleDto {
  const result = obj as UserSimpleDto

  return (
    result !== undefined &&
    result.id !== undefined &&
    result.username !== undefined &&
    result.email !== undefined &&
    result.profile !== undefined &&
    result.isAdmin !== undefined
  )
}
