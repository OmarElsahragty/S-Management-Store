import { set, connect } from "mongoose";

import { logger } from "../libraries";

export const establishConnection = async (uri: string) => {
  set("strictQuery", true);

  await connect(uri).then(() => logger.info("🗒️ Connected to mongoDB successfully"));
};
