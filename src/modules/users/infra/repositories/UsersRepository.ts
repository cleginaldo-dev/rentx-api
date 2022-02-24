import { formatInTimeZone } from "date-fns-tz";
import { getRepository, Repository } from "typeorm";

import {
  IUsersRepository,
  IListAllParams,
  IListAllReturn,
} from "@modules/users/repositories/IUsersRepository";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../typeorm/entities/User";

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    username,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      username,
      email,
      password,
      driver_license,
    });
    await this.ormRepository.save(user);
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.ormRepository.findOne({ email });
    return user;
  }

  async findByUserName(username: string): Promise<User> {
    const user = await this.ormRepository.findOne({ username });
    return user;
  }

  async save(receivedUser: User): Promise<User> {
    return this.ormRepository.save(receivedUser);
  }

  async list(params?: IListAllParams): Promise<IListAllReturn> {
    const queryBuilder = this.ormRepository
      .createQueryBuilder("users")
      .orderBy("users.name", "DESC");
    if (params) {
      if (params.name) {
        queryBuilder.andWhere("users.name ILIKE :name", {
          name: `%${params.name}%`,
        });
      }
      if (params.initial_date) {
        const initialDate = formatInTimeZone(
          params.initial_date,
          "UTC",
          "yyyy-MM-dd"
        );

        queryBuilder.andWhere("users.created_at >= :initial_date", {
          initial_date: initialDate,
        });
      }

      if (params.final_date) {
        const finalDate = formatInTimeZone(
          params.final_date,
          "UTC",
          "yyyy-MM-dd'T'23:59:59"
        );

        queryBuilder.andWhere("users.created_at <= :final_date", {
          final_date: finalDate,
        });
      }
    }
    const data = await queryBuilder.getMany();
    const total = await queryBuilder.getCount();

    return { total, data };
  }

  async delete(id: string): Promise<number> {
    const queryBuilder = this.ormRepository
      .createQueryBuilder("users")
      .orderBy("users.name", "DESC");
    await this.ormRepository.delete(id);
    const total = await queryBuilder.getCount();
    return total;
  }
}

export { UsersRepository };
