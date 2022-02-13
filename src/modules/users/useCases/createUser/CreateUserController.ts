import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, username, email, password, driver_license } = request.body;

    const createUserUserCase = container.resolve(CreateUserUseCase);
    const createdUser = await createUserUserCase.execute({
      name,
      username,
      email,
      password,
      driver_license,
    });
    return response.status(201).json(instanceToPlain(createdUser));
  }
}
export { CreateUserController };
