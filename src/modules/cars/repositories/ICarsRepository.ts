import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicense_plate(license_plate: string): Promise<Car>;
  findAllCarAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]>;
  findById(id: string): Promise<Car>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}
export { ICarsRepository };
