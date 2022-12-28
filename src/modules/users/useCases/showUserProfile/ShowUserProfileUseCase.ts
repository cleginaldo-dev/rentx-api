import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/users/dtos/IUserResponseDTO";
import { UserMap } from "@modules/users/mapper/UserMap";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

export interface IRequest {
  user_id: string;
}
@injectable()
class ShowUserProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id }: IRequest): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("Usuário não encontrado!");
    }

    return UserMap.toDTO(user);
  }
}

export { ShowUserProfileUseCase };
