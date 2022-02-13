import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { User } from "@modules/users/infra/typeorm/entities/User";

import {
  IUsersRepository,
  IListAllParams,
  IListAllReturn,
} from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async create({
    name,
    username,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name,
      username,
      email,
      password,
      driver_license,
    });
    this.users.push(user);

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }
  async findByUserName(username: string): Promise<User> {
    const user = this.users.find((user) => user.username === username);
    return user;
  }

  async save(user: User): Promise<User> {
    return user;
  }

  async list(params?: IListAllParams): Promise<IListAllReturn> {
    if (params) throw new Error("Method not implemented.");
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<number> {
    if (id) throw new Error("Method not implemented.");
    throw new Error("Method not implemented.");
  }
}
export { UsersRepositoryInMemory };
