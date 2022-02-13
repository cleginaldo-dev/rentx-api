import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

import { UsersRepository } from "@modules/users/infra/repositories/UsersRepository";

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const { logged_user_id } = req;
  const userRepository = container.resolve(UsersRepository);
  const { admin } = await userRepository.findById(logged_user_id);

  if (admin) {
    return next();
  }
  return res.status(401).json({
    error: "O usuário logado não tem permissão de administrador!",
  });
}
