import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { recipeServices } from "./recipe.service";

import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";

const createRecipe = catchAsync(
  async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    try {
      const userData = req.user;

      if (!userData) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "User authentication failed"
        );
      }

      const recipe = await recipeServices.createRecipeIntoDB(req.body);

      // Send a successful response
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Recipe created successfully",
        data: recipe,
      });
    } catch (error) {
      next(error);
    }
  }
);

//get all recipes

const getAllRecipes = catchAsync(async (req, res) => {
  try {
    const result = await recipeServices.getAllRecipiesFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Recipes retrieved successfully",
      data: result,
    });
  } catch (error) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "api is not valid");
  }
});

const getRecipeByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const recipes = await recipeServices.getRecipeByUserIdFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Recipe retrieved successfully",
    data: recipes,
  });
};

const deleteRecipe = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = recipeServices.deleteRecipeFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Recipe deleted successfully",
    data: result,
  });
});

export const recipeControllers = {
  createRecipe,
  getAllRecipes,
  deleteRecipe,

  getRecipeByUserId,
};
