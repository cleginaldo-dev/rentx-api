import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

export interface IRequest {
  user_id: string;
}
@injectable()
class DeleteUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ user_id }: IRequest): Promise<number> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("Usuário inexistente!");
    }
    if (user.admin) {
      throw new AppError("O administrador não pode ser deletado!");
    }
    const total = await this.usersRepository.delete(user.id);
    return total;
  }
}
export { DeleteUserUseCase };
