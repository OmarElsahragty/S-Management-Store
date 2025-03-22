import { isValidObjectId, Types as mongooseTypes } from "mongoose";

import { removeUndefined, flatten } from "../helpers/objects.helper";

import type { QueryOptionsInterface } from "../types";
import type { FilterQuery } from "mongoose";

export const isValidMongoId = (data: any) => {
  return !!(
    data &&
    (data instanceof mongooseTypes.ObjectId ||
      (typeof data === "string" && /^[0-9a-fA-F]{24}$/.test(data) && isValidObjectId(data)))
  );
};

const filterProperties = <T>(property: T): FilterQuery<T> => {
  if (property instanceof mongooseTypes.ObjectId) return property;
  if (typeof property === "boolean") return property;
  if (Array.isArray(property)) return { $in: property };
  if (typeof property === "string" && isValidMongoId(property)) return new mongooseTypes.ObjectId(property);
  if ((typeof property === "string" || typeof property === "number") && !isNaN(new Date(property).getTime())) {
    return new Date(property);
  }
  if (typeof property === "string") return { $regex: property, $options: "i" };
  return property as FilterQuery<T>;
};

const buildInterval = (filed: string, { minimum, maximum }: { minimum?: number; maximum?: number }) => {
  if (minimum && maximum) return { [filed]: { $gte: minimum, $lte: maximum } };
  if (minimum) return { [filed]: { $gte: minimum } };
  return { [filed]: { $lte: maximum } };
};

export const queryBuilder = <T>({
  id = "",
  filter = {},
  intervals = [],
  options = { flattenQuery: false, operation: "and", falsy: false },
}: QueryOptionsInterface<T> = {}): FilterQuery<T> => {
  if (options.falsy) return { _id: { $exists: false } };

  const query = options.flattenQuery ? flatten(removeUndefined(filter)) : removeUndefined(filter);

  if (id) Object.assign(query, { _id: id });
  for (const { filed, minimum, maximum } of intervals) Object.assign(query, buildInterval(filed, { minimum, maximum }));

  const filterItems = Object.keys(query).map(key => ({
    [key]: filterProperties(query[key as keyof typeof query]),
  }));

  return (
    filterItems.length > 0 ? { [options.operation === "or" ? "$or" : "$and"]: filterItems } : {}
  ) as FilterQuery<T>;
};
