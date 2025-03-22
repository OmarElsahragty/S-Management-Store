import { DefaultRepository } from "../../core";
import { storeModel } from "../models";

import type { StoreInterface } from "../../types";

class StoreRepository extends DefaultRepository<StoreInterface> {
  constructor() {
    super(storeModel, []);
  }
}
export const storeRepository = new StoreRepository();
