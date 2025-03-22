import { DefaultController } from "../core";
import { supplierService } from "../services";

import type { SupplierInterface } from "../types";

class SupplierController extends DefaultController<SupplierInterface> {
  public constructor() {
    super(supplierService);
  }
}

export const supplierController = new SupplierController();
