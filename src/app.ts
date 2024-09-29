import path from "path";

import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";

import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import noDataFound from "./app/middlewares/noDataFound";
import httpStatus from "http-status";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,

    // methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
//Testing
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: "Welcome to assignment-6",
  });
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);
app.use(noDataFound);

export default app;
