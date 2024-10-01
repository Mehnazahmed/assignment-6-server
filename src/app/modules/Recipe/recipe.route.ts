import validateRequest from "../../middlewares/validateRequest";

import { Router } from "express";

import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import { recipeValidation } from "./recipe.validation";
import { recipeControllers } from "./recipe.controller";

const router = Router();
//create recipe
router.post(
  "/",
  auth(USER_ROLE.USER),
  validateRequest(recipeValidation.recipeVslidationSchema),
  recipeControllers.createRecipe
);

//get all recipes
router.get(
  "/",
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  recipeControllers.getAllRecipes
);

router.get(
  "/:id",
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  recipeControllers.getRecipeByUserId
);

//delete recipe
router.delete(
  "/:id",

  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  recipeControllers.deleteRecipe
);

export const RecipeRoutes = router;
