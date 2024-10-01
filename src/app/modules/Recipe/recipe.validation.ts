import { z } from "zod";

const ingredientSchema = z.object({
  name: z.string({ message: "Ingredient name is required" }),
  quantity: z.string({ message: "Quantity is required" }),
});

const ratingSchema = z.object({
  userId: z.string({ message: "User ID is required" }),
  recipeId: z.string({ message: "Recipe ID is required" }),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot be more than 5"),
});

const commentSchema = z.object({
  userId: z.string({ message: "User ID is required" }),
  recipeId: z.string({ message: "Recipe ID is required" }),
  comment: z.string({ message: "Comment cannot be empty" }),
});

export const recipeVslidationSchema = z.object({
  body: z.object({
    title: z.string({ message: "Title is required" }),
    author: z.string({ message: "Author ID is required" }),
    ingredients: z
      .array(ingredientSchema)
      .min(1, "At least one ingredient is required"),
    instructions: z
      .array(
        z
          .string({ message: "Instruction cannot be empty" })
          .nonempty("Instruction cannot be empty")
      )
      .min(1, "At least one instruction is required"),
    cookingTime: z
      .number()
      .min(1, "Cooking time must be at least 1 minute")
      .nonnegative("Cooking time must be a positive number"),
    servings: z
      .number()
      .min(1, "Servings must be at least 1")
      .nonnegative("Servings must be a positive number"),
    image: z.string().url("Invalid image URL"),
    category: z
      .string({ message: "Title is required" })
      .nonempty("Category is required"),
    ratings: z.array(ratingSchema).optional(),
    comments: z.array(commentSchema).optional(),
    upvotes: z.number({ message: "Upvotes cannot be negative" }).default(0),
    downvotes: z.number({ message: "Downvotes cannot be negative" }).default(0),
    isPremium: z.boolean().default(false),
    transactionId: z.string().optional(),
  }),
});

export const recipeValidation = {
  recipeVslidationSchema,
};
