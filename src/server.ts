import http from "node:http";

import cors from "cors";
import express from "express";
import helmet from "helmet";

import routes from "./routes";
import socketIO from "./socket-io";

import type { EnvironmentsEnum } from "./types";
import type { Express } from "express";

export default class HTTP {
  private readonly port: number;
  private readonly express: Express;
  private readonly server: http.Server;

  constructor(port: number, environment: EnvironmentsEnum) {
    this.port = port;
    this.express = express().use(express.json()).use(cors());

    if (environment === "PRODUCTION") this.express.use(helmet());

    this.express.use("/api", routes);

    this.server = http.createServer(this.express);
    socketIO.setup(this.server);
  }

  start() {
    this.server.listen(this.port, () => console.log(`🚀 Server is running on port: ${this.port}`));
  }
}
