import { UserSimpleDto } from "../user/UserSimpleDto"

export interface FollowDto {
  id: string
  followerId: string
  follower?: UserSimpleDto

  followingUserId: string
  followingUser?: UserSimpleDto

  createdAt: string
  updatedAt: string
}
