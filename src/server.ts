import http from "node:http";

import cors from "cors";
import express, { json } from "express";
import helmet from "helmet";

import { logger } from "./libraries";
import routes from "./routes";
import socketIO from "./socket-io";

import type { EnvironmentEnum } from "./types";
import type { Express } from "express";

export default class HTTP {
  private readonly port: number;
  private readonly express: Express;
  private readonly server: http.Server;

  public constructor(port: number, environment: EnvironmentEnum) {
    this.port = port;
    this.express = express().use(json()).use(cors());

    if (environment === "PRODUCTION") this.express.use(helmet());

    this.express.use("/api", routes);

    this.server = http.createServer(this.express);
    socketIO.setup(this.server);
  }

  public start(): void {
    this.server.listen(this.port, () => logger.info(`🚀 Server is running on port: ${this.port}`));
  }
}
