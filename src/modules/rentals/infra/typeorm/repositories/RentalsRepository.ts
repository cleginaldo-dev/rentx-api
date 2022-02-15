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
    id,
    end_date,
    car_id,
    user_id,
    expected_return_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.ormRepository.create({
      id,
      end_date,
      car_id,
      user_id,
      expected_return_date,
      total,
    });
    await this.ormRepository.save(rental);
    return rental;
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.ormRepository.findOne({ car_id, end_date: null });
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.ormRepository.findOne({
      user_id,
      end_date: null,
    });
  }
  async findRentalById(id: string): Promise<Rental> {
    return this.ormRepository.findOne({ id });
  }
  async findRentalByUser(user_id: string): Promise<Rental[]> {
    return this.ormRepository.find({ where: { user_id }, relations: ["car"] });
  }
}
export { RentalsRepository };
