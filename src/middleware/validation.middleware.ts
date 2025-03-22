import type { Request, Response, NextFunction } from "express";
import type { AnyZodObject } from "zod";

export default (
    schema: AnyZodObject,
    { source = "body", isArray = false }: { source?: "body" | "query" | "params"; isArray?: boolean } = {}
  ) =>
  async (request: Request, _res: Response, next: NextFunction) => {
    try {
      await (isArray ? schema.array().parseAsync(request[source]) : schema.parseAsync(request[source]));

      return next();
    } catch (error) {
      return next(error);
    }
  };
