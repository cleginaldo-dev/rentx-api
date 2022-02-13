import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

export interface IListAllParams {
  name?: string;
  initial_date?: Date;
  final_date?: Date;
}
export interface IListAllReturn {
  total: number;
  data: User[];
}

interface IUsersRepository {
  create({
    name,
    username,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByUserName(username: string): Promise<User>;
  save(user: User): Promise<User>;
  list(params?: IListAllParams): Promise<IListAllReturn>;
  delete(id: string): Promise<number> | undefined;
}
export { IUsersRepository };
