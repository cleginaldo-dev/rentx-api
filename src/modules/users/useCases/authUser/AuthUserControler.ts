import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthUserUseCase } from "./AuthUserUseCase";

class AuthUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, username, password } = request.body;
    const authUserUseCase = container.resolve(AuthUserUseCase);
    const { token, user } = await authUserUseCase.execute({
      email,
      username,
      password,
    });
    return response.json({ token, user });
  }
}
export { AuthUserController };
