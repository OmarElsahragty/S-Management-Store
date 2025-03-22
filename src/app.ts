import config from "../config";

import { establishConnection } from "./database";
import http from "./server";

export default async () => {
  try {
    await establishConnection(config.mongoURI);
    new http(config.port, config.environment).start();
  } catch (error) {
    console.error(error);
    return process.exit(1);
  }
};
