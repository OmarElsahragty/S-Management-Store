import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

import { databaseErrorParser } from "../helpers";
import { logger } from "../libraries";

import type { storeSchema, warehouseSchema, notificationSchema, supplierSchema } from "./schemas";
import type { MongoServerError } from "mongodb";
import type { ProjectionType } from "mongoose";
import type { z } from "zod";

declare module "express-serve-static-core" {
  interface RequestInterface {
    client?: StoreInterface;
  }
}

// ********************************* //

class Exception extends Error {
  public status = 500;
  public override message = "An error occurred. Please try again later.";

  public constructor(public error?: Error | Exception | ZodError | MongoServerError) {
    super();

    if (!error) return this;
    if (this.error instanceof Exception) return this.error;

    if (this.error instanceof ZodError) {
      this.status = 400;
      this.message = fromZodError(this.error).message;
      return this;
    }

    const parsedMongoErrorMessage = error.name === "MongoServerError" && databaseErrorParser(error as MongoServerError);
    if (typeof parsedMongoErrorMessage === "string" && parsedMongoErrorMessage.trim()) {
      this.status = 400;
      this.message = parsedMongoErrorMessage;
      return this;
    }

    logger.error(this.message, error);
  }
}

class NotFoundException extends Exception {
  public constructor(message = "Not Found") {
    super();
    this.status = 404;
    this.message = message;
  }
}

class UnauthorizedException extends Exception {
  public constructor(message = "Unauthorized") {
    super();
    this.status = 401;
    this.message = message;
  }
}

class ForbiddenException extends Exception {
  public constructor(message = "Forbidden") {
    super();
    this.status = 403;
    this.message = message;
  }
}

interface EntityInformationInterface {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}

export { ForbiddenException, UnauthorizedException, NotFoundException };

export interface IntervalInterface {
  filed: string;
  minimum?: number;
  maximum?: number;
}

export interface QueryOptionsInterface<T> {
  id?: string;
  filter?: Partial<T>;
  intervals?: IntervalInterface[];
  options?: { flattenQuery?: boolean; operation?: "and" | "or"; falsy?: boolean };
}

export interface ListInterface<T> {
  data: Array<Partial<T>>;
  totalCount: number;
}

export interface ListOptionsInterface<T> {
  page?: number;
  pageLimit?: number;
  sortBy?: string;
  sortDirection?: 1 | -1;
  showAll?: boolean;
  projection?: ProjectionType<T>;
}

export interface ResponseInterface<T> {
  data?: T | T[];
  metadata?: { errors: Array<{ status?: number; message: string; error?: Exception | ZodError | MongoServerError }> };
}

// ********************************* //

export interface StoreInterface extends EntityInformationInterface, z.infer<typeof storeSchema> {}
export interface WarehouseInterface extends EntityInformationInterface, z.infer<typeof warehouseSchema> {}
export interface NotificationInterface extends EntityInformationInterface, z.infer<typeof notificationSchema> {}
export interface SupplierInterface extends EntityInformationInterface, z.infer<typeof supplierSchema> {}
