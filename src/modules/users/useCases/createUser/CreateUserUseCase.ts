import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  username?: string;
  email: string;
  password: string;
  driver_license: string;
}
@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    username,
    email,
    password,
    driver_license,
  }: IRequest): Promise<User> {
    const passwordHash = await hash(password, 8);
    const userNameExists = await this.usersRepository.findByUserName(username);
    if (userNameExists) {
      throw new AppError("Nome de usuário já existe!");
    }

    const emailExists = await this.usersRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError("Email já existe!");
    }
    const createdUser = await this.usersRepository.create({
      name,
      username,
      email,
      password: passwordHash,
      driver_license,
    });
    return createdUser;
  }
}
export { CreateUserUseCase };
