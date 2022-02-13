import { Request, Response } from "express";
import { container } from "tsyringe";

import { IRequest, ListAvailableCarUseCase } from "./ListAvailableCarUseCase";

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, category_id, name } = request.query;
    const listAvailableCarsUseCase = container.resolve(ListAvailableCarUseCase);
    const cars = await listAvailableCarsUseCase.execute({
      brand,
      category_id,
      name,
    } as IRequest);
    return response.json(cars);
  }
}
export { ListAvailableCarsController };
