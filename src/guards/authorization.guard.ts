import { verify } from "jsonwebtoken";

import config from "../../config";
import { storeService } from "../services";
import { ForbiddenException, UnauthorizedException } from "../types";

import type { Request, Response, NextFunction } from "express";

export const authorizedGuard = async (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  try {
    const token = request.headers.authorization;
    if (!token) throw new ForbiddenException("Authorization token is missing");

    const { _id: storeId } = await new Promise<{ _id: string }>((resolve, reject) => {
      if (token.includes("Bearer")) {
        return verify(token.replace("Bearer ", ""), config.jwtSecret, (error, jwtPayload) => {
          const result = jwtPayload as undefined | { _id: string };
          if (error || !result?._id) return reject(new ForbiddenException());
          resolve(result);
        });
      }
      reject(new ForbiddenException());
    });

    const store = await storeService.fetch({ id: storeId });
    if (!store) throw new UnauthorizedException();
    request.store = store;

    return next();
  } catch (error) {
    return next(error);
  }
};
