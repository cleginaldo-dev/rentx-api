import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/users/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  token: string;
  password: string;
}
@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) {}
  async execute({ token, password }: IRequest): Promise<User> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );

    if (!userToken) {
      throw new AppError("Token invalid!");
    }
    if (
      this.dayjsDateProvider.compareIfBefore(
        userToken.expires_date,
        this.dayjsDateProvider.dateNow()
      )
    ) {
      throw new AppError("Token expired!");
    }
    const user = await this.usersRepository.findById(userToken.user_id);

    Object.assign(user, {
      password: await hash(password, 8),
      updated_at: new Date(),
    });

    const userAlterPassword = await this.usersRepository.save(user);

    await this.usersTokensRepository.deleteById(userToken.id);

    return userAlterPassword;
  }
}
export { ResetPasswordUserUseCase };
