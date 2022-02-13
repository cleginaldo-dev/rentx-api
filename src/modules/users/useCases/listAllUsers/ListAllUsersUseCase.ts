import { instanceToPlain } from "class-transformer";
import { inject, injectable } from "tsyringe";

import {
  IUsersRepository,
  IListAllReturn,
} from "@modules/users/repositories/IUsersRepository";

export interface IRequest {
  name?: string;
  initial_date?: Date;
  final_date?: Date;
}
@injectable()
class ListAllUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    name,
    initial_date,
    final_date,
  }: IRequest): Promise<IListAllReturn> {
    const allUsers = await this.usersRepository.list({
      name,
      initial_date,
      final_date,
    });
    return instanceToPlain(allUsers) as IListAllReturn;
  }
}
export { ListAllUsersUseCase };
