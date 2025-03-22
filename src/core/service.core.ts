import type { ListInterface, ListOptionsInterface, QueryOptionsInterface } from "../types";
import type { DefaultRepository } from "./repository.core";

export class DefaultService<T> {
  public constructor(private readonly repository: DefaultRepository<T>) {}

  public list = async (
    queryOptions: QueryOptionsInterface<T>,
    options?: ListOptionsInterface
  ): Promise<ListInterface<T>> => {
    return this.repository.find(queryOptions, options);
  };

  public fetch = async (queryOptions: QueryOptionsInterface<T>): Promise<T | null> => {
    return this.repository.findOne(queryOptions);
  };

  public create = async (data: T): Promise<T> => {
    return this.repository.create(data);
  };

  public bulkCreate = (data: T[]): Array<Promise<T>> => {
    return data.map(async item => this.create(item));
  };

  public update = async (queryOptions: QueryOptionsInterface<T>, data: Partial<T>): Promise<T | null> => {
    return this.repository.update(queryOptions, data);
  };

  public delete = async (queryOptions: QueryOptionsInterface<T>): Promise<T | null> => {
    return this.repository.delete(queryOptions);
  };
}
