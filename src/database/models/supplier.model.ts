import { Schema, model } from "mongoose";

import { schemas } from "../../../constants";

import type { SupplierInterface } from "../../types";

const supplierSchema = new Schema<SupplierInterface>(
  {
    storeId: { type: String, trim: true, required: true },
    name: { type: String, trim: true, required: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true },
    address: { type: String, trim: true },
    providing: { type: [String], trim: true },
    isDeleted: { type: Boolean, default: false, required: false },
  },
  { timestamps: true, versionKey: false }
).index({ isDeleted: 1 });

export const supplierModel = model<SupplierInterface>(schemas.supplier, supplierSchema);
