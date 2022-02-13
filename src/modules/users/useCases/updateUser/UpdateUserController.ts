import { hash } from "bcryptjs";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const { logged_user_id } = request;
    const { name, username, email, password, driver_license, admin } =
      request.body;

    const passwordHash = await hash(password, 8);
    const updateUserUseCase = container.resolve(UpdateUserUseCase);
    const userUpdate = await updateUserUseCase.execute({
      name,
      username,
      email,
      user_id,
      logged_user_id,
      password: passwordHash,
      driver_license,
      admin,
    });
    return response.json(userUpdate);
  }
}
export { UpdateUserController };
