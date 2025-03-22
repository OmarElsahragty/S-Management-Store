import { verify } from "jsonwebtoken";

import config from "../../config";
import { storeService } from "../services";
import { ForbiddenException } from "../types";

import type { StoreInterface } from "../types";
import type { Request, Response, NextFunction } from "express";

export default async (request: Request, _res: Response, next: NextFunction) => {
  try {
    const token = request.headers.authorization;

    const data = (await new Promise((resolve, reject): void | Partial<StoreInterface> => {
      if (!token) return reject();

      if (token.includes("Bearer")) {
        return verify(token.replace("Bearer ", ""), config.jwt.secret, (error, result) =>
          error || !result ? reject() : resolve(result)
        );
      }
    }).catch(() => {})) as void | Partial<StoreInterface>;

    const client = data?._id && (await storeService.fetch({ id: data._id }));

    if (!client) throw new ForbiddenException();
    request.client = client;

    next();
  } catch (error) {
    return next(error);
  }
};
