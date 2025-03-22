import config from "../config";

import { establishConnection } from "./database";
import { logger } from "./libraries";
import http from "./server";

export const application = async (): Promise<void> => {
  try {
    await establishConnection(config.mongoURI);
    new http(config.port, config.environment).start();
  } catch (error) {
    logger.error(error);
  }
};
