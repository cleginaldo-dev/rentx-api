import { getRepository, Repository } from "typeorm";

import { ICreateUserTokensDTO } from "@modules/users/dtos/ICreateUserTokensDTO";
import { IUsersTokensRepository } from "@modules/users/repositories/ICreateUsersTokensRepository";

import { UserTokens } from "../typeorm/entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  private ormRepository: Repository<UserTokens>;

  constructor() {
    this.ormRepository = getRepository(UserTokens);
  }
  async create(data: ICreateUserTokensDTO): Promise<UserTokens> {
    const userTokens = this.ormRepository.create(data);

    await this.ormRepository.save(userTokens);

    return userTokens;
  }
}
export { UsersTokensRepository };
