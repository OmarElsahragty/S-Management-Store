import config from "../config";
import { establishConnection, seeder } from "../src/database";

const run = async () => {
  await establishConnection(config.mongoURI);
  if (config.environment === "SEEDING") return seeder();
};

run()
  .then(() => process.exit())
  .catch(error => {
    console.error(error);
    return process.exit(1);
  });
