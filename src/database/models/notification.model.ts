import { Schema, model } from "mongoose";

import { schemas } from "../../../constants";
import { NotificationTypes } from "../../types";

import type { NotificationInterface } from "../../types";

const notificationSchema = new Schema<NotificationInterface>(
  {
    storeId: { type: String, trim: true, required: true },
    type: { type: String, trim: true, required: true, enum: NotificationTypes },
    details: { type: String, trim: true, required: true },
    readAt: { type: Date },
    isDeleted: { type: Boolean, default: false, required: false },
  },
  { timestamps: true, versionKey: false }
).index({ isDeleted: 1 });

export const notificationModel = model<NotificationInterface>(
  schemas.notification,
  notificationSchema
);
