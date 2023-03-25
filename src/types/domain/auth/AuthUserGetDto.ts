export interface AuthUserGetDto {
  id: string
  username: string
  email: string
  token: string
  isAdmin: boolean
  expiresAt: string
}
