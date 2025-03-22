import { Types } from "mongoose";

import { removeUndefined, flatten } from "../helpers";
import { queryBuilder } from "../utilities";

import type { ListOptionsInterface, ListInterface, QueryOptionsInterface } from "../types";
import type { Model, UpdateQuery, ProjectionType, PopulateOptions } from "mongoose";

export default class DefaultRepository<T> {
  constructor(
    private readonly model: Model<T>,
    private readonly population: PopulateOptions[]
  ) {
    Types.ObjectId.prototype.valueOf = function () {
      return this.toString();
    };
  }

  count = async (queryOptions: QueryOptionsInterface<T>): Promise<number> => {
    return this.model.count(queryBuilder<T>(queryOptions)).exec();
  };

  find = async (
    queryOptions: QueryOptionsInterface<T>,
    { page = 0, pageLimit = 10, sortBy, sortDirection = 1, showAll, projection }: ListOptionsInterface<T> = {}
  ): Promise<ListInterface<T>> => {
    const query = queryBuilder<T>(queryOptions);
    const curser = this.model.find(query, projection);

    if (sortBy) curser.sort({ [sortBy]: sortDirection });
    if (!showAll) curser.skip(page * pageLimit).limit(pageLimit);
    if (this.population.length > 0) curser.populate(this.population);

    const data = (await curser.lean().exec()) as T[];

    return {
      data,
      totalCount: showAll ? data.length : await this.model.count(query).exec(),
    };
  };

  findOne = async (queryOptions: QueryOptionsInterface<T>, projection?: ProjectionType<T>): Promise<T | null> => {
    const curser = this.model.findOne(queryBuilder<T>(queryOptions), projection);
    if (this.population) curser.populate(this.population);
    return curser.lean();
  };

  create = async (data: T): Promise<T> => {
    const curser = await this.model.create(data);
    if (this.population) curser.populate(this.population);
    return curser.toObject();
  };

  update = async (queryOptions: QueryOptionsInterface<T>, data: UpdateQuery<T>): Promise<T | null> => {
    const curser = this.model.findOneAndUpdate(queryBuilder<T>(queryOptions), flatten(removeUndefined(data)));
    if (this.population) curser.populate(this.population);
    return curser.lean();
  };

  delete = async (queryOptions: QueryOptionsInterface<T>): Promise<T | null> => {
    const curser = this.model.findOneAndUpdate(queryBuilder<T>(queryOptions), { isDeleted: true });
    if (this.population) curser.populate(this.population);
    return curser.lean();
  };
}
