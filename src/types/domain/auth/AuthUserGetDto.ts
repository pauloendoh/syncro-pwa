export interface AuthUserGetDto {
  id: string
  username: string
  email: string
  userExpiresAt: string | null
  isAdmin: boolean

  token: string
  tokenExpiresAt: string
}
