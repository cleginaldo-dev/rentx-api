import { Request, Response } from "express";
import { container } from "tsyringe";

import { IRequest, TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const turnUserAdminUseCase = container.resolve(TurnUserAdminUseCase);
    const userAdmin = await turnUserAdminUseCase.execute({
      user_id,
    } as IRequest);
    return response.json(userAdmin);
  }
}
export { TurnUserAdminController };
