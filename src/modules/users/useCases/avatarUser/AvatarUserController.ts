import { Request, Response } from "express";
import { container } from "tsyringe";

import { AvatarUserUseCase } from "./AvatarUserUseCase";

class AvatarUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { logged_user_id } = request;
    const avatar_file = request.file.filename;

    const avatarUserUseCase = container.resolve(AvatarUserUseCase);
    await avatarUserUseCase.execute({ user_id: logged_user_id, avatar_file });

    return response.status(204).send();
  }
}
export { AvatarUserController };
