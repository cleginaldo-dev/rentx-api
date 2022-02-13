import { compare } from "bcryptjs";
import { instanceToPlain } from "class-transformer";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IAuthUserRequest {
  email?: string;
  username?: string;
  password: string;
}
interface IResponse {
  token: string;
  user: User;
}

@injectable()
class AuthUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    email,
    username,
    password,
  }: IAuthUserRequest): Promise<IResponse> {
    const user =
      (await this.usersRepository.findByEmail(email)) ||
      (await this.usersRepository.findByUserName(username));

    if (!user) {
      throw new AppError("Email, nome de usuário ou senha incorretos");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email,  nome de usuário ou senha incorretos");
    }

    const token = sign(
      {
        email: user.email,
        username: user.username,
      },
      "6a204bd89f3c8348afd5c77c717a097a",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );
    return instanceToPlain({ token, user }) as IResponse;
  }
}
export { AuthUserUseCase };
