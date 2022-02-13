import { getRepository, Repository } from "typeorm";

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  ormRepository: Repository<Rental>;

  constructor() {
    this.ormRepository = getRepository(Rental);
  }
  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.ormRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });
    await this.ormRepository.save(rental);
    return rental;
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.ormRepository.findOne(car_id);
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.ormRepository.findOne(user_id);
  }
}
export { RentalsRepository };
