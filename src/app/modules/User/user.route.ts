import express from "express";
import { UserControllers } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";

const router = express.Router();

export const UserRoutes = router;

router.post(
  "/create-user",

  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.userRegister
);

router.get("/", auth(USER_ROLE.ADMIN), UserControllers.getAllUsers);
router.get(
  "/:id",

  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  UserControllers.getSingleUser
);
router.patch(
  "/:id",
  auth(USER_ROLE.ADMIN),
  validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateUser
);

router.delete("/:id", auth(USER_ROLE.ADMIN), UserControllers.deleteUser);
