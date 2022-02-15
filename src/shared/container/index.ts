import { container, delay } from "tsyringe";

import "@shared/container/providers";
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { UsersRepository } from "@modules/users/infra/repositories/UsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  delay(() => UsersRepository)
);

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  delay(() => CategoriesRepository)
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  delay(() => SpecificationsRepository)
);

container.registerSingleton<ICarsRepository>(
  "CarsRepository",
  delay(() => CarsRepository)
);

container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  delay(() => CarsImagesRepository)
);

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  delay(() => RentalsRepository)
);
