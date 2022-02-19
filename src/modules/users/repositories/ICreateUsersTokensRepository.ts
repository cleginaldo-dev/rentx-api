import { ICreateUserTokensDTO } from "../dtos/ICreateUserTokensDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokensRepository {
  create(data: ICreateUserTokensDTO): Promise<UserTokens>;
}
export { IUsersTokensRepository };
