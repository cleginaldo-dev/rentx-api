import { Router } from "express";

import { AuthUserController } from "@modules/users/useCases/authUser/AuthUserControler";
import { RefreshTokenController } from "@modules/users/useCases/refreshToken/RefreshTokenController";

const authenticateRoutes = Router();

const authUserController = new AuthUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/login", authUserController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes };
