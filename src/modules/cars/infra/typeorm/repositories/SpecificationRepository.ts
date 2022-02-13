import { getRepository, Repository } from "typeorm";

import { ICreateSpecificationsDTO } from "@modules/cars/dtos/ICreateSpecificationsDTO";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private ormRepository: Repository<Specification>;

  constructor() {
    this.ormRepository = getRepository(Specification);
  }

  async create({
    name,
    description,
  }: ICreateSpecificationsDTO): Promise<Specification> {
    const specification = this.ormRepository.create({ name, description });

    await this.ormRepository.save(specification);

    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    const specification = this.ormRepository.findOne({ name });
    return specification;
  }

  async list(): Promise<Specification[]> {
    return this.ormRepository.find();
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.ormRepository.findByIds(ids);
    return specifications;
  }
}

export { SpecificationsRepository };
