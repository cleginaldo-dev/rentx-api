import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memoryTests/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthUserUseCase } from "./AuthUserUseCase";

let autheUserUseCase: AuthUserUseCase;
let usersRepositoryTests: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryTests = new UsersRepositoryInMemory();
    autheUserUseCase = new AuthUserUseCase(usersRepositoryTests);
    createUserUseCase = new CreateUserUseCase(usersRepositoryTests);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "Amarildo de paiva",
      username: "amaral",
      email: "amaral@gmail.com",
      password: "123",
      driver_license: "123123123",
    };
    await createUserUseCase.execute(user);

    const result = await autheUserUseCase.execute({
      email: user.email,
      password: user.password,
    });
    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate with incorrect username", () => {
    expect(async () => {
      await autheUserUseCase.execute({
        username: "incorrectUseName",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect email", () => {
    expect(async () => {
      await autheUserUseCase.execute({
        email: "incorrectEmail",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "000123",
        email: "user@gmail.com",
        username: "user",
        password: "1234",
        name: "User Test",
      };
      await createUserUseCase.execute(user);

      await autheUserUseCase.execute({
        email: user.email,
        password: "incorrectPassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
