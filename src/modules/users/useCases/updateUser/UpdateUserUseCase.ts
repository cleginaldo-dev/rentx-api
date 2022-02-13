import { inject, injectable } from "tsyringe";

import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

export interface IRequest {
  user_id: string;
  logged_user_id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  driver_license: string;
  admin: boolean;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({
    user_id,
    logged_user_id,
    name,
    username,
    email,
    password,
    driver_license,
    admin,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("Usuário não existe!");
    }

    const userNameExists = await this.usersRepository.findByUserName(username);

    if (userNameExists && user.username !== userNameExists.username) {
      throw new AppError("O nome de usuário já existe no bando de dados!");
    }

    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists && user.email !== emailExists.email) {
      throw new AppError("O email já existe no bando de dados!");
    }

    const loggedUser = await this.usersRepository.findById(logged_user_id);

    if (!user.admin && admin && !loggedUser.admin) {
      throw new AppError(
        "O usuário logado não tem permissão para tornar o usuário editado em administrador!"
      );
    }

    Object.assign(user, {
      name,
      username,
      email,
      password,
      updated_at: new Date(),
      driver_license,
      admin,
    });

    const userUpdate = await this.usersRepository.save(user);
    return userUpdate;
  }
}

export { UpdateUserUseCase };
