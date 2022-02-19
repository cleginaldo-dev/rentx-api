import { getRepository, Repository } from "typeorm";

import { ICreateUserTokensDTO } from "@modules/users/dtos/ICreateUserTokensDTO";
import { IUsersTokensRepository } from "@modules/users/repositories/IUsersTokensRepository";

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

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userTokens = await this.ormRepository.findOne({
      user_id,
      refresh_token,
    });
    return userTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
export { UsersTokensRepository };
