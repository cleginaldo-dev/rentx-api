import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
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
    throw new AppError("Token missing", 401);
  }
  try {
    // Verificar se o token é válido
    const [, token] = authToken.split(" ");
    // Recuperar informações de usuário
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

    request.logged_user_id = user_id;
    return next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
}
