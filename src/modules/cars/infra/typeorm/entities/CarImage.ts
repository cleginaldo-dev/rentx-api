import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("car_image")
class CarImage {
  @PrimaryColumn()
  readonly id: string;
  @Column()
  image_name: string;
  @Column()
  car_id: string;
  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
export { CarImage };
