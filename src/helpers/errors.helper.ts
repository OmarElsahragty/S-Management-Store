import type { MongoServerError } from "mongodb";

export const databaseErrorParser = (error: MongoServerError): string | undefined => {
  if (error.code === 11_000) return "Duplicate key error. The record already exists.";

  return undefined;
};
