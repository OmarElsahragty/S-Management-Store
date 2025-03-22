import { parser } from "../helpers";
import { Exception, NotFoundException } from "../types";

import type { ResponseInterface, IntervalInterface } from "../types";
import type Service from "./service.core";
import type { Request, Response, NextFunction } from "express";

export default class DefaultController<T> {
  constructor(private readonly service: Service<T>) {}

  protected response = async <T>(logic: Promise<T> | Array<Promise<T>>, res: Response, next: NextFunction) => {
    try {
      const data = await Promise.allSettled(Array.isArray(logic) ? logic : [logic]);
      const { fulfilled = [], rejected = [] }: { fulfilled?: T[]; rejected?: Exception[] } = data.reduce(
        (accumulator: { fulfilled: T[]; rejected: Exception[] }, item) => {
          if (item.status === "fulfilled") {
            return Object.assign(accumulator, { fulfilled: accumulator.fulfilled.concat(item.value) });
          }

          return Object.assign(accumulator, { rejected: [...accumulator.rejected, new Exception(item.reason)] });
        },
        { fulfilled: [], rejected: [] }
      );

      if (fulfilled.length === 0 && rejected.length === 0) throw new NotFoundException();
      if (fulfilled.length === 0) throw rejected;

      const response: ResponseInterface<T> = {
        data: fulfilled.length < 2 ? fulfilled[0] : fulfilled,
        metadata: { errors: rejected.map(({ status, message }) => ({ status, message })) },
      };

      return res
        .status(
          fulfilled.length === 0
            ? rejected.reduce((accumulator: number, rejection) => Math.min(rejection.status, accumulator), 0)
            : 200
        )
        .send(response);
    } catch (error) {
      next(error);
    }
  };

  list = async (request: Request, res: Response, next: NextFunction) => {
    const filter = parser<Partial<T>>(request.query.filter?.toString());
    let intervals = parser<IntervalInterface | IntervalInterface[]>(request.query.intervals?.toString());
    if (intervals && !Array.isArray(intervals)) intervals = [intervals];
    const projection = parser(request.query.projection?.toString())
      ?.split(",")
      .reduce((accumulator: Record<string, 1>, item) => {
        const key = parser<string>(item.trim());

        if (!key) return accumulator;
        return Object.assign(accumulator, { [key]: 1 });
      }, {});

    return this.response(
      this.service.list(
        {
          filter,
          intervals,
          options: {
            flattenQuery: true,
            operation: parser(request.query.operation?.toString()) === "or" ? "or" : "and",
          },
        },
        {
          projection,
          sortBy: parser(request.query.sort?.toString()),
          sortDirection: request.query.direction?.toString() === "1" ? 1 : -1,
          page: Number.parseInt(request.query.page?.toString() ?? "0"),
          pageLimit: Number.parseInt(request.query.limit?.toString() ?? "10"),
          showAll: request.query.showAll?.toString() === "true",
        }
      ),
      res,
      next
    );
  };

  fetch = async (request: Request, res: Response, next: NextFunction) =>
    this.response(this.service.fetch({ id: request.params.id }), res, next);

  create = async (request: Request, res: Response, next: NextFunction) =>
    this.response(this.service.create(request.body), res, next);

  bulkCreate = async (request: Request, res: Response, next: NextFunction) =>
    this.response(this.service.bulkCreate(request.body), res, next);

  update = async (request: Request, res: Response, next: NextFunction) =>
    this.response(this.service.update({ id: request.params.id }, request.body), res, next);

  delete = async (request: Request, res: Response, next: NextFunction) =>
    this.response(this.service.delete({ id: request.params.id }), res, next);
}
