import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { AvatarUserController } from "@modules/users/useCases/avatarUser/AvatarUserController";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { DeleteUserController } from "@modules/users/useCases/deleteUser/DeleteUserController";
import { ListAllUsersController } from "@modules/users/useCases/listAllUsers/ListAllUsersController";
import { ShowUserProfileController } from "@modules/users/useCases/showUserProfile/ShowUserProfileController";
import { TurnUserAdminController } from "@modules/users/useCases/turnUserAdmin/TurnUserAdminController";
import { UpdateUserController } from "@modules/users/useCases/updateUser/UpdateUserController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const turnUserAdminController = new TurnUserAdminController();
const listAllUsersController = new ListAllUsersController();
const showUserProfileController = new ShowUserProfileController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const avatarUserController = new AvatarUserController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/admin/:user_id",
  ensureAuthenticated,
  ensureAdmin,
  turnUserAdminController.handle
);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  avatarUserController.handle
);

usersRoutes.get(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  listAllUsersController.handle
);
usersRoutes.get(
  "/:user_id",
  ensureAuthenticated,
  showUserProfileController.handle
);

usersRoutes.put("/:user_id", ensureAuthenticated, updateUserController.handle);

usersRoutes.delete(
  "/:user_id",
  ensureAuthenticated,
  ensureAdmin,
  deleteUserController.handle
);

export { usersRoutes };
