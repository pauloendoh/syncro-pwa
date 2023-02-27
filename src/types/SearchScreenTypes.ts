import { ProfileScreenTypes } from "./ProfileScreenTypes"
import { SyncroItemScreenParams } from "./screen-params"

export type SearchScreenTypes = ProfileScreenTypes & {
  Search: undefined
  SyncroItem: SyncroItemScreenParams
}
