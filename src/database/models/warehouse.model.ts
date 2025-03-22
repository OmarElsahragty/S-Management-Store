import { Schema, model } from "mongoose";

import { schemas } from "../../../constants";
import { WarehouseItemCategories, Countries, AgeGroups, QuantityUnits } from "../../types";

import type { WarehouseInterface } from "../../types";

const warehouseSchema = new Schema<WarehouseInterface>(
  {
    storeId: { type: String, trim: true, required: true },
    name: { type: String, trim: true, required: true },
    code: { type: String, trim: true, required: true },
    category: { type: String, trim: true, required: true, enum: WarehouseItemCategories },
    images: { type: [String], trim: true },
    details: { type: String, trim: true },
    ingredientElementsIds: { type: [String], trim: true },
    brand: { type: String, trim: true },
    countryOfOrigin: { type: String, trim: true, enum: Countries },
    supplierId: { type: String, trim: true },
    numberOfPiecesPerUnit: { type: Number },
    productionDate: { type: Date },
    expirationDate: { type: Date },
    weight: { type: String, trim: true },
    dimensions: {
      type: new Schema(
        {
          length: { type: String, trim: true, required: true },
          width: { type: String, trim: true, required: true },
          height: { type: String, trim: true, required: true },
        },
        { _id: true, versionKey: false, timestamps: true }
      ),
    },
    ageGroup: { type: String, trim: true, enum: AgeGroups },
    quantity: { type: Number },
    quantityUnit: { type: String, trim: true, enum: QuantityUnits },
    pricePerUnit: { type: Number },
    minimumRequiredQuantity: { type: Number },
    returnablePeriod: { type: String, trim: true },
    warrantyPeriod: { type: String, trim: true },
    isDeleted: { type: Boolean, default: false, required: false },
  },
  { timestamps: true, versionKey: false }
).index({ isDeleted: 1 });

export const warehouseModel = model<WarehouseInterface>(schemas.warehouse, warehouseSchema);
