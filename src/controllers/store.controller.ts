import { DefaultController } from "../core";
import { storeService } from "../services";

import type { StoreInterface } from "../types";
import type { Request, Response, NextFunction } from "express";

class StoreController extends DefaultController<StoreInterface> {
  public constructor() {
    super(storeService);
  }

  public authenticate = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    await this.response(
      storeService.authenticate(request.body as { username: string; password: string }),
      response,
      next
    );
  };
}

export const storeController = new StoreController();
