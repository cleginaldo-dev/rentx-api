import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/users/infra/repositories/UsersRepository";
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
      "6a204bd89f3c8348afd5c77c717a097a"
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists!", 401);
    }

    request.logged_user_id = user_id;
    return next();
  } catch (error) {
    return response.status(401).end();
  }
}
