import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memoryTests/CarsRepositoryInMemory";

import { ListAvailableCarUseCase } from "./ListAvailableCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarUseCase: ListAvailableCarUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarUseCase = new ListAvailableCarUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all avaible cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Description Car",
      license_plate: "ABC-1234",
      daily_rate: 100,
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    const cars = await listAvailableCarUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all avaible by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Description Car",
      license_plate: "ABC-1235",
      daily_rate: 100,
      fine_amount: 60,
      brand: "Brand_test",
      category_id: "category",
    });

    const cars = await listAvailableCarUseCase.execute({
      brand: "Brand_test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all avaible by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Description Car",
      license_plate: "ABC-1236",
      daily_rate: 100,
      fine_amount: 60,
      brand: "Brand_test",
      category_id: "category",
    });

    const cars = await listAvailableCarUseCase.execute({
      name: "Car3",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all avaible by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Description Car",
      license_plate: "ABC-1236",
      daily_rate: 100,
      fine_amount: 60,
      brand: "Brand_test",
      category_id: "12345",
    });

    const cars = await listAvailableCarUseCase.execute({
      category_id: "12345",
    });

    expect(cars).toEqual([car]);
  });
});
