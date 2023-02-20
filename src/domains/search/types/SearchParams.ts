import { IsString } from "class-validator";
import { SyncroItemType } from "../../syncro-item/SyncroItemType";

export class SearchParams {
  @IsString()
  q: string;

  @IsString()
  type: SyncroItemType | "users";
}
