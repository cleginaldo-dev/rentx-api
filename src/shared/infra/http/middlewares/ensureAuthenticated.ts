import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UsersTokensRepository } from "@modules/users/infra/repositories/UsersTokensRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Receber token
  const authToken = request.headers.authorization;
  const usersTokensRepository = new UsersTokensRepository();
  // Validar se token está preenchido
  if (!authToken) {
    throw new AppError("Token faltando ou inválido", 401);
  }
  try {
    // Verificar se o token é válido
    const [, token] = authToken.split(" ");
    // Recuperar informaçẽs de usuário
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload;

    const user = usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!user) {
      throw new AppError("User does not exists!", 401);
    }

    request.logged_user_id = user_id;
    return next();
  } catch (error) {
    return response.status(401).end();
  }
}
