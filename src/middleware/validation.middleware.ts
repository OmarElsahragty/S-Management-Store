import type { Request, Response, NextFunction } from "express";
import type { AnyZodObject } from "zod";

export const validateMiddleware =
  (
    schema: AnyZodObject,
    { source = "body", isArray = false }: { source?: keyof Request; isArray?: boolean } = {}
  ) =>
  async (request: Request, _response: Response, next: NextFunction) => {
    try {
      await (isArray
        ? schema.array().parseAsync(request[source])
        : schema.parseAsync(request[source]));

      next();
    } catch (error) {
      next(error);
    }
  };
