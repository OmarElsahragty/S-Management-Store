import type { ListOptionsInterface, QueryOptionsInterface } from "../types";
import type Repository from "./repository.core";

export default class DefaultService<T> {
  constructor(private readonly repository: Repository<T>) {}

  list = async (queryOptions: QueryOptionsInterface<T>, options?: ListOptionsInterface<T>) => {
    return this.repository.find(queryOptions, options);
  };

  fetch = async (queryOptions: QueryOptionsInterface<T>) => {
    return this.repository.findOne(queryOptions);
  };

  create = async (data: T) => {
    return this.repository.create(data);
  };

  bulkCreate = (data: T[]): Array<Promise<T>> => data.map(async item => this.create(item));

  update = async (queryOptions: QueryOptionsInterface<T>, data: Partial<T>) => {
    return this.repository.update(queryOptions, data);
  };

  delete = async (queryOptions: QueryOptionsInterface<T>) => {
    return this.repository.delete(queryOptions);
  };
}
