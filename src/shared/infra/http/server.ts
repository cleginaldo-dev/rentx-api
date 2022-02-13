import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";

import "@shared/container";

import { AppError } from "@shared/errors/AppError";
import createConection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes/index";

createConection();
const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
);

app.listen(3333, () => console.log("Server is running"));
