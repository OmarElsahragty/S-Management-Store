import { DefaultController } from "../core";
import { supplierService } from "../services";

import type { SupplierInterface } from "../types";

class SupplierController extends DefaultController<SupplierInterface> {
  constructor() {
    super(supplierService);
  }
}

export default new SupplierController();
