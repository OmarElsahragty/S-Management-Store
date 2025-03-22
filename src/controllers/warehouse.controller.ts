import { DefaultController } from "../core";
import { warehouseService } from "../services";

import type { WarehouseInterface } from "../types";

class WarehouseController extends DefaultController<WarehouseInterface> {
  constructor() {
    super(warehouseService);
  }
}

export default new WarehouseController();
