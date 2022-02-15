import { ICreateRentalDTO } from "../infra/typeorm/dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;
  findRentalById(id: string): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  findRentalByUser(user_id: string): Promise<Rental[]>;
}
export { IRentalsRepository };
