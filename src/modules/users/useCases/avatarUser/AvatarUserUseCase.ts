import { inject, injectable } from "tsyringe";
import { deleteFile } from "utils/deleteFile";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class AvatarUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersResporitory: IUsersRepository
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersResporitory.findById(user_id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar_file;

    await this.usersResporitory.save(user);
  }
}
export { AvatarUserUseCase };
