import { Schema, model } from "mongoose";

import { schemas } from "../../../constants";
import { createHash } from "../../libraries";
import { AccessTypes } from "../../types";

import type { StoreInterface } from "../../types";

const storeSchema = new Schema<StoreInterface>(
  {
    name: { type: String, trim: true, required: true },
    type: { type: String, trim: true, required: true },
    address: { type: String, trim: true, required: true },
    long: { type: Number, required: true },
    lat: { type: Number, required: true },
    phone: { type: String, trim: true, required: true },
    username: { type: String, trim: true, unique: true, required: true },
    password: { type: String, trim: true, required: true },
    accessType: { type: String, trim: true, default: "DENIED", enum: AccessTypes },
    isDeleted: { type: Boolean, default: false, required: false },
  },
  { timestamps: true, versionKey: false }
)
  .index({ username: 1 }, { unique: true })
  .index({ accessType: 1 })
  .index({ isDeleted: 1 });

// ************** hash ************** //
storeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (this.password) this.password = await createHash(this.password);
  next();
});

storeSchema.pre("findOneAndUpdate", async function (next) {
  const data = this.getUpdate() as StoreInterface;
  if (data.password) data.password = await createHash(data.password);
  this.setUpdate(data);
  next();
});

export const storeModel = model<StoreInterface>(schemas.store, storeSchema);
