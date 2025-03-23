import config from "../config";
import { establishConnection, seeder } from "../src/database";
import { logger } from "../src/libraries";

const run = async () => {
  await establishConnection(config.mongoURI);
  if (config.environment === "SEEDING") return seeder();
};

run().catch(logger.error);
