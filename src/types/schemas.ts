import { z } from "zod";

import {
  AccessTypes,
  WarehouseItemCategories,
  Countries,
  AgeGroups,
  QuantityUnits,
  NotificationTypes,
} from "./enums";

export const authSchema = z.object({
  username: z.string(),
  password: z.string().optional(),
  accessType: z.enum(AccessTypes).optional(),
});

// ********************************* //

export const storeSchema = authSchema.merge(
  z.object({
    email: z.string().email(),
    name: z.string(),
    type: z.string(),
    address: z.string(),
    long: z.number(),
    lat: z.number(),
    phone: z.string(),
  })
);

export const warehouseSchema = z.object({
  storeId: z.string(),
  name: z.string(),
  code: z.string(),
  category: z.enum(WarehouseItemCategories),
  images: z.string().array().optional(),
  details: z.string().optional(),
  ingredientElementsIds: z.string().array().optional(),
  brand: z.string().optional(),
  countryOfOrigin: z.enum(Countries).optional(),
  supplierId: z.string().optional(),
  numberOfPiecesPerUnit: z.number().optional(),
  productionDate: z.date().optional(),
  expirationDate: z.date().optional(),
  weight: z.string().optional(),
  dimensions: z.object({ length: z.string(), width: z.string(), height: z.string() }).optional(),
  ageGroup: z.enum(AgeGroups).optional(),
  quantity: z.number().optional(),
  quantityUnit: z.enum(QuantityUnits).optional(),
  pricePerUnit: z.number().optional(),
  minimumRequiredQuantity: z.number().optional(),
  returnablePeriod: z.string().optional(),
  warrantyPeriod: z.string().optional(),
});

export const notificationSchema = z.object({
  storeId: z.string(),
  type: z.enum(NotificationTypes),
  details: z.string(),
  readAt: z.date().optional(),
});

export const supplierSchema = z.object({
  storeId: z.string(),
  name: z.string(),
  phone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  providing: z.string().array().optional(),
});
