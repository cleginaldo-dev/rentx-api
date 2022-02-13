import { Request, Response } from "express";
import { container } from "tsyringe";

import { IRequest, ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const showUserProfileUseCase = container.resolve(ShowUserProfileUseCase);
    const user = await showUserProfileUseCase.execute({
      user_id,
    } as IRequest);
    return response.json(user);
  }
}
export { ShowUserProfileController };
