import { ProfileDto } from "./domain/profile/ProfileDto"
import { SyncroItemType } from "./domain/syncro-item/SyncroItemType/SyncroItemType"
import { SyncroItemScreenParams } from "./screen-params"

export type ProfileScreenTypes = {
  Profile: { userId: string }
  EditProfile: { initialValues: ProfileDto }
  FollowersScreen: { userId: string; type: "followers" | "following-users" }
  UserItems: {
    userId: string
    itemType: SyncroItemType
  }
  SyncroItem: SyncroItemScreenParams
}
