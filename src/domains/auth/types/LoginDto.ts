import { IsString } from "class-validator";

export class LoginDto {
  @IsString()
  identificator: string;

  @IsString()
  password: string;
}
