import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/car";

class CarsRepository implements ICarsRepository {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = getRepository(Car);
  }

  async create({
    id,
    name,
    description,
    license_plate,
    daily_rate,
    fine_amount,
    brand,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.ormRepository.create({
      id,
      name,
      description,
      license_plate,
      daily_rate,
      fine_amount,
      brand,
      category_id,
      specifications,
    });

    await this.ormRepository.save(car);

    return car;
  }

  async findByLicense_plate(license_plate: string): Promise<Car> {
    const car = await this.ormRepository.findOne({ license_plate });

    return car;
  }

  async findAllCarAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = this.ormRepository
      .createQueryBuilder("cars")
      .where("available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("cars.brand = :brand", {
        brand,
      });
    }
    if (category_id) {
      carsQuery.andWhere("cars.category_id = :category_id", {
        category_id,
      });
    }
    if (name) {
      carsQuery.andWhere("cars.name = :name", {
        name,
      });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }
  async findById(id: string): Promise<Car> {
    return this.ormRepository.findOne(id);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id })
      .execute();
  }
}
export { CarsRepository };
