import { set, connect } from "mongoose";

export const establishConnection = async (uri: string) => {
  set("strictQuery", true);

  return connect(uri).then(() => console.log("🗒️ Connected to mongoDB successfully"));
};
