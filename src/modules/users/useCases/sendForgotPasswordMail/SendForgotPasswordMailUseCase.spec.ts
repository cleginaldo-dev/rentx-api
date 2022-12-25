import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memoryTests/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/users/repositories/in-memoryTests/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/mailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUserCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    mailProvider = new MailProviderInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("Should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "679644",
      email: "rockbaoboa@gmail.com",
      name: "Jenilson Santos",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("rockbaoboa@gmail.com");

    expect(sendMail).toBeCalled();
  });

  it("Should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("jubileu@gmail.com")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("Should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    await usersRepositoryInMemory.create({
      driver_license: "673222",
      email: "therock@gmail.com",
      name: "Robes Santos",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("therock@gmail.com");

    expect(generateTokenMail).toBeCalled();
  });
});
