import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { logged_user_id } = request;
    const { expected_return_date, car_id } = request.body;
    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      car_id,
      expected_return_date,
      user_id: logged_user_id,
    });
    return response.status(201).json(rental);
  }
}
export { CreateRentalController };
