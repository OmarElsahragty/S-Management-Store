import { DefaultController } from "../core";
import { warehouseService } from "../services";

import type { WarehouseInterface } from "../types";

class WarehouseController extends DefaultController<WarehouseInterface> {
  public constructor() {
    super(warehouseService);
  }
}

export const warehouseController = new WarehouseController();
