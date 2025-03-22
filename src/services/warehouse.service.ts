import { DefaultService } from "../core";
import { warehouseRepository } from "../database/repositories";

import type { WarehouseInterface } from "../types";

class WarehouseService extends DefaultService<WarehouseInterface> {
  constructor() {
    super(warehouseRepository);
  }
}

export const warehouseService = new WarehouseService();
