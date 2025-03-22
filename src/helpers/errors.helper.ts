import type { MongoServerError } from "mongodb";

export const databaseErrorParser = (error: MongoServerError): undefined | string => {
  if (error.code === 11_000) return "Duplicate key error. The record already exists.";
};
