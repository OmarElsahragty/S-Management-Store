import { DefaultRepository } from "../../core";
import { warehouseModel } from "../models";

import type { WarehouseInterface } from "../../types";

class WarehouseRepository extends DefaultRepository<WarehouseInterface> {
  public constructor() {
    super(warehouseModel);
  }
}
export const warehouseRepository = new WarehouseRepository();
