import { Types } from "mongoose";
import { TUser } from "../User/user.interface";

export interface TRecipe {
  _id: string;
  title: string;
  author: TUser;
  ingredients: TIngredient[];
  instructions: string[];
  cookingTime: number;
  servings: number;
  image: string;
  category: string;
  createdAt: Date;
  updatedAt?: Date;

  // Social features
  ratings: TRating[];
  comments: TComment[];
  upvotes: number;
  downvotes: number;
  isPremium: boolean;
  isDeleted: boolean;
  transactionId?: string;
}

export interface TIngredient {
  name: string;
  quantity: string;
  // unit: string;
}

export interface TRating {
  _id: string;
  userId: Types.ObjectId;
  recipeId: Types.ObjectId;
  rating: number;
}

export interface TComment {
  _id: string;
  userId: Types.ObjectId;
  recipeId: Types.ObjectId;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}
