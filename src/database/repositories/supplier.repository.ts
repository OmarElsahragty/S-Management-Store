import { DefaultRepository } from "../../core";
import { supplierModel } from "../models";

import type { SupplierInterface } from "../../types";

class SupplierRepository extends DefaultRepository<SupplierInterface> {
  public constructor() {
    super(supplierModel, []);
  }
}
export const supplierRepository = new SupplierRepository();
