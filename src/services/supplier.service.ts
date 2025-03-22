import { DefaultService } from "../core";
import { supplierRepository } from "../database/repositories";

import type { SupplierInterface } from "../types";

class SupplierService extends DefaultService<SupplierInterface> {
  constructor() {
    super(supplierRepository);
  }
}

export const supplierService = new SupplierService();
