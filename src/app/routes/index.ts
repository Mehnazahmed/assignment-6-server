import { Router } from "express";
import { UserRoutes } from "../modules/User/user.route";
import { RecipeRoutes } from "../modules/Recipe/recipe.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { paymentRoutes } from "../modules/payment/payment.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/recipe",
    route: RecipeRoutes,
  },
  {
    path: "/payment",
    route: paymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route)); // This will automatically loop your routes that you will add in the moduleRoutes array

export default router;
