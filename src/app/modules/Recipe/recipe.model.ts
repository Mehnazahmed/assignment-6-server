import { Schema, model, Types } from "mongoose";
import { TComment, TIngredient, TRating, TRecipe } from "./recipe.interface";

// Ingredient schema
const ingredientSchema = new Schema<TIngredient>({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
});

// Rating schema
const ratingSchema = new Schema<TRating>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipeId: {
    type: Schema.Types.ObjectId,
    ref: "Recipe",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

// Comment schema
const commentSchema = new Schema<TComment>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipeId: {
    type: Schema.Types.ObjectId,
    ref: "Recipe",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Recipe schema
const recipeSchema = new Schema<TRecipe>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    ingredients: [ingredientSchema],
    instructions: [
      {
        type: String,
        required: true,
      },
    ],
    cookingTime: {
      type: Number,
      required: true,
    },
    servings: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    ratings: [ratingSchema],
    comments: [commentSchema],
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    transactionId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

export const Recipe = model<TRecipe>("Recipe", recipeSchema);
