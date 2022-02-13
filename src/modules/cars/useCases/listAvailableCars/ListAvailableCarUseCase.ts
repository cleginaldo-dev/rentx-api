import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

export interface IRequest {
  brand?: string;
  category_id?: string;
  name?: string;
}
@injectable()
class ListAvailableCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}
  async execute({ brand, category_id, name }: IRequest): Promise<Car[]> {
    const car = await this.carsRepository.findAllCarAvailable(
      brand,
      category_id,
      name
    );
    return car;
  }
}
export { ListAvailableCarUseCase };
