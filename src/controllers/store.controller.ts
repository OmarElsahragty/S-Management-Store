import { DefaultController } from "../core";
import { storeService } from "../services";

import type { StoreInterface } from "../types";
import type { Request, Response, NextFunction } from "express";

class StoreController extends DefaultController<StoreInterface> {
  constructor() {
    super(storeService);
  }

  authenticate = async (request: Request, res: Response, next: NextFunction) => {
    return this.response(storeService.authenticate(request.body.username, request.body.password), res, next);
  };
}

export default new StoreController();
