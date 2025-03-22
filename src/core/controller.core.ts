import { Exception, NotFoundException } from "../types";

import type { QueryOptionsInterface } from "../types";
import type { DefaultService } from "./service.core";
import type { Request, Response, NextFunction } from "express";

export class DefaultController<T> {
  public constructor(private readonly service: DefaultService<T>) {}

  public list = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const queryOptions = request.body as QueryOptionsInterface<T>;

    await this.response(
      this.service.list(queryOptions, {
        sortBy: request.query["sort"]?.toString() as string,
        sortDirection: request.query["direction"]?.toString() === "-1" ? -1 : 1,
        showAll: request.query["showAll"]?.toString() === "true",
        page: Number.parseInt(request.query["page"]?.toString() ?? "0", 10),
        pageLimit: Number.parseInt(request.query["limit"]?.toString() ?? "10", 10),
      }),
      response,
      next
    );
  };

  public fetch = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    await this.response(this.service.fetch({ id: request.params["id"] as string }), response, next);
  };

  public create = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    await this.response(this.service.create(request.body as T), response, next);
  };

  public bulkCreate = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    await this.response(this.service.bulkCreate(request.body as T[]), response, next);
  };

  public update = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    await this.response(
      this.service.update({ id: request.params["id"] as string }, request.body as Partial<T>),
      response,
      next
    );
  };

  public delete = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    await this.response(this.service.delete({ id: request.params["id"] as string }), response, next);
  };

  protected response = async <T>(
    logic: Promise<T> | Array<Promise<T>>,
    response: Response,
    next: NextFunction
  ): Promise<Response<unknown, Record<string, unknown>> | void> => {
    try {
      const data = await Promise.allSettled(Array.isArray(logic) ? logic : [logic]);

      const { fulfilled = [], rejected = [] }: { fulfilled?: T[]; rejected?: Exception[] } = data.reduce(
        (accumulator: { fulfilled: T[]; rejected: Exception[] }, item) => {
          if (item.status === "fulfilled") {
            return { ...accumulator, fulfilled: [...accumulator.fulfilled, item.value] };
          }
          return {
            ...accumulator,
            rejected: [...accumulator.rejected, new Exception(item.reason as Error)],
          };
        },
        { fulfilled: [], rejected: [] }
      );

      if (fulfilled.length === 0) next(rejected);
      if (fulfilled.length === 0 && rejected.length === 0) next(new NotFoundException());

      return response
        .status(
          fulfilled.length === 0
            ? rejected.reduce((accumulator: number, rejection) => Math.min(rejection.status, accumulator), 0)
            : 200
        )
        .send({
          data: fulfilled.length < 2 ? fulfilled[0] : fulfilled,
          metadata: { errors: rejected.map(({ status, message }) => ({ status, message })) },
        });
    } catch (error) {
      next(error);
    }
  };
}
