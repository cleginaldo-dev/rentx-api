import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memoryTests/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/users/repositories/in-memoryTests/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthUserUseCase } from "./AuthUserUseCase";

let authUserUseCase: AuthUserUseCase;
let usersRepositoryTests: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    usersRepositoryTests = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authUserUseCase = new AuthUserUseCase(
      usersRepositoryTests,
      usersTokensRepositoryInMemory,
      dateProvider
    );
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

    const result = await authUserUseCase.execute({
      email: user.email,
      password: user.password,
    });
    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate with incorrect username", async () => {
    await expect(
      authUserUseCase.execute({
        username: "incorrectUseName",
        password: "1234",
      })
    ).rejects.toEqual(
      new AppError("Email, nome de usuário ou senha incorretos")
    );
  });

  it("should not be able to authenticate with incorrect email", async () => {
    await expect(
      authUserUseCase.execute({
        email: "incorrectEmail",
        password: "1234",
      })
    ).rejects.toEqual(
      new AppError("Email, nome de usuário ou senha incorretos")
    );
  });

  it("should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "user@gmail.com",
      username: "user",
      password: "1234",
      name: "User Test",
    };
    await createUserUseCase.execute(user);
    await expect(
      authUserUseCase.execute({
        email: user.email,
        password: "incorrectPassword",
      })
    ).rejects.toEqual(
      new AppError("Email, nome de usuário ou senha incorretos")
    );
  });
});
