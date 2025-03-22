import config from "../config";
import { establishConnection, seeder } from "../src/database";
import { logger } from "../src/libraries";

const run = async (): Promise<void> => {
  await establishConnection(config.mongoURI);
  if (config.environment === "SEEDING") return seeder();
};

await run().catch(logger.error);
