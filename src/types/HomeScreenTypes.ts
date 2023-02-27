import { ProfileScreenTypes } from "./ProfileScreenTypes"
import { SyncroItemScreenParams } from "./screen-params"

export type HomeScreenTypes = ProfileScreenTypes & {
  Home: undefined
  Notifications: undefined
  SyncroItem: SyncroItemScreenParams
  SavedItems: undefined
}
