import mongoose from "mongoose";

import { TRecipe } from "./recipe.interface";
import { Recipe } from "./recipe.model";

const createRecipeIntoDB = async (payload: TRecipe) => {
  const {} = payload;

  const result = await Recipe.create(payload);

  return result;
};

const getAllRecipiesFromDB = async () => {
  const result = await Recipe.find().populate("author");
  return result;
};

const deleteRecipeFromDB = async (id: string) => {
  const result = await Recipe.findByIdAndUpdate(
    id,
    { isDeleted: "true" },
    {
      new: true,
    }
  );
  return result;
};

const getRecipeByUserIdFromDB = async (userId: string) => {
  try {
    // Querying directly as a string
    const recipe = await Recipe.find({
      "user._id": userId,
      isDeleted: { $ne: "true" },
    })

      .populate("author");

    if (!recipe) {
      throw new Error("Recipe not found");
    }

    return recipe;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw error;
  }
};

// const getBookingsByUser = async (userEmail: string) => {
//   try {
//     // Step 1: Query the User by email
//     const user = await User.findOne({ email: userEmail });

//     if (!user) {
//       throw new Error("User not found");
//     }

//     const userId = user._id;

//     const userBookings = await Booking.find({ user: userId }).populate(
//       "facility"
//     );

//     return userBookings;
//   } catch (error) {
//     console.error("Error in getBookingsByUser:", error);
//     throw error;
//   }
// };

export const recipeServices = {
  createRecipeIntoDB,
  getAllRecipiesFromDB,
  deleteRecipeFromDB,

  getRecipeByUserIdFromDB,
};
