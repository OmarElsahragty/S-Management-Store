import { flatten } from "../helpers";
import { queryBuilder } from "../utilities";

import type { ListOptionsInterface, ListInterface, QueryOptionsInterface } from "../types";
import type { Model, UpdateQuery, PopulateOptions } from "mongoose";

export class DefaultRepository<T> {
  public constructor(
    private readonly model: Model<T>,
    private readonly population?: PopulateOptions[]
  ) {}

  public count = async (queryOptions: QueryOptionsInterface<T>): Promise<number> => {
    return this.model.countDocuments(queryBuilder<T>(queryOptions)).exec();
  };

  public find = async (
    queryOptions: QueryOptionsInterface<T>,
    { page = 0, pageLimit = 10, sortBy, sortDirection = 1, showAll }: ListOptionsInterface = {}
  ): Promise<ListInterface<T>> => {
    const query = queryBuilder<T>(queryOptions);
    const curser = this.model.find(query);

    if (sortBy) curser.sort({ [sortBy]: sortDirection });
    if (!showAll) curser.skip(page * pageLimit).limit(pageLimit);
    if (this.population?.length) curser.populate(this.population);

    const data = (await curser.lean().exec()) as T[];
    return {
      data,
      totalCount: showAll ? data.length : await this.model.countDocuments(query).exec(),
    };
  };

  public findOne = async (queryOptions: QueryOptionsInterface<T>): Promise<T | null> => {
    const curser = this.model.findOne(queryBuilder<T>(queryOptions));
    if (this.population) curser.populate(this.population);
    return curser.lean().exec() as Promise<T | null>;
  };

  public create = async (data: T): Promise<T> => {
    const curser = await this.model.create(data);
    return curser.toObject();
  };

  public update = async (
    queryOptions: QueryOptionsInterface<T>,
    data: UpdateQuery<T>
  ): Promise<T | null> => {
    const curser = this.model.findOneAndUpdate(queryBuilder<T>(queryOptions), flatten(data));
    if (this.population) curser.populate(this.population);
    return curser.lean().exec() as Promise<T | null>;
  };

  public delete = async (queryOptions: QueryOptionsInterface<T>): Promise<T | null> => {
    const curser = this.model.findOneAndUpdate(queryBuilder<T>(queryOptions), { isDeleted: true });
    if (this.population) curser.populate(this.population);
    return curser.lean().exec() as Promise<T | null>;
  };
}
