import { isValidObjectId, Types as mongooseTypes } from "mongoose";

import { flatten } from "../helpers/objects.helper";

import type { QueryOptionsInterface } from "../types";
import type { FilterQuery } from "mongoose";

export const isValidMongoId = (data: unknown): boolean => {
  return Boolean(
    data &&
      (data instanceof mongooseTypes.ObjectId ||
        (typeof data === "string" && /^[0-9a-fA-F]{24}$/.test(data) && isValidObjectId(data)))
  );
};

const filterProperties = <T>(property: T): FilterQuery<T> => {
  if (Array.isArray(property)) return { $in: property };
  if (isValidMongoId(property)) return new mongooseTypes.ObjectId(property as string | mongooseTypes.ObjectId);
  if ((typeof property === "string" || typeof property === "number") && !Number.isNaN(new Date(property).getTime())) {
    return new Date(property);
  }
  if (typeof property === "string") return { $regex: property, $options: "i" };
  return property as FilterQuery<T>;
};

export const queryBuilder = <T>({
  id,
  filter = {},
  intervals = [],
  options = { operation: "and" },
}: QueryOptionsInterface<T> = {}): FilterQuery<T> => {
  const query: FilterQuery<T> = {};

  if (id) Object.assign(query, { _id: id });

  Object.assign(query, {
    [options.operation === "or" ? "$or" : "$and"]: Object.entries(flatten(filter)).reduce(
      (accumulator: Array<Record<string, unknown>>, [key, value]) => [
        { [key]: filterProperties(value) },
        ...accumulator,
      ],
      []
    ),
  });

  intervals.forEach(({ filed, minimum, maximum }) => {
    if (!filed) return;
    if (minimum && maximum) Object.assign(query, { [filed]: { $gte: minimum, $lte: maximum } });
    if (minimum) Object.assign(query, { [filed]: { $gte: minimum } });
    if (maximum) Object.assign(query, { [filed]: { $lte: maximum } });
  });

  return query;
};
