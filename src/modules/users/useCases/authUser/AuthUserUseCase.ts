import { compare } from "bcryptjs";
import { instanceToPlain } from "class-transformer";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUsersTokensRepository } from "@modules/users/repositories/ICreateUsersTokensRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IAuthUserRequest {
  email?: string;
  username?: string;
  password: string;
}
interface IResponse {
  token: string;
  user: User;
  refresh_token: string;
}

@injectable()
class AuthUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) {}

  public async execute({
    email,
    username,
    password,
  }: IAuthUserRequest): Promise<IResponse> {
    const {
      expires_in_token,
      secret_refresh_token,
      secret_token,
      expires_in_refresh_token,
      expires_in_refresh_token_days,
    } = auth;
    const user =
      (await this.usersRepository.findByEmail(email)) ||
      (await this.usersRepository.findByUserName(username));

    if (!user) {
      throw new AppError("Email, nome de usuário ou senha incorretos");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email, nome de usuário ou senha incorretos");
    }

    const token = sign(
      {
        email,
      },
      secret_token,
      {
        subject: user.id,
        expiresIn: expires_in_token,
      }
    );

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dayjsDateProvider.addDays(
      expires_in_refresh_token_days
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      expires_date: refresh_token_expires_date,
      refresh_token,
    });

    return instanceToPlain({ token, user, refresh_token }) as IResponse;
  }
}
export { AuthUserUseCase };
