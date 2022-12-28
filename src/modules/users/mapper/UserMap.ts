import { instanceToPlain } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

export class UserMap {
  static toDTO({
    id,
    name,
    email,
    avatar,
    driver_license,
    username,
    created_at,
    updated_at,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = instanceToPlain({
      id,
      name,
      email,
      avatar,
      driver_license,
      username,
      created_at,
      updated_at,
      avatar_url,
    });

    return user as IUserResponseDTO;
  }
}
