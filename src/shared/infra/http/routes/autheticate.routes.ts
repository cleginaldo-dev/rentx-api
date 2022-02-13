import { Router } from "express";

import { AuthUserController } from "@modules/users/useCases/authUser/AuthUserControler";

const authenticateRoutes = Router();

const authUserController = new AuthUserController();

authenticateRoutes.post("/login", authUserController.handle);

export { authenticateRoutes };
