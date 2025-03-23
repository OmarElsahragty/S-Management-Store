import config from "../../config";
import { Exception } from "../types";

import type { Request, Response, NextFunction } from "express";
import type { MongoServerError } from "mongodb";
import type { ZodError } from "zod";

export const errorHandlerMiddleware = (
  error: Exception | Exception[] | ZodError | MongoServerError | Error,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  const errors = (Array.isArray(error) ? error : [error]).map((item) => new Exception(item));

  response
    .status(errors.reduce((accumulator, item) => Math.max(item.status, accumulator), 0))
    .send({
      metadata: {
        errors:
          config.environment === "PRODUCTION"
            ? errors.map(({ status, message }) => ({ status, message }))
            : errors,
      },
    });
};
