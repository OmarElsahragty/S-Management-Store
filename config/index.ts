import { config } from "dotenv";

import type { EnvironmentEnum } from "../src/types";

config();

export default Object.freeze({
  environment: process.env["NODE_ENV"] as EnvironmentEnum,

  cors: process.env["CORS"] ?? "*",

  port: Number.parseInt(process.env["PORT"] ?? "5000", 10),

  mongoURI: process.env["MONGO_URI"] ?? "mongodb://127.0.0.1:27017/newbie",

  jwt: {
    secret: process.env["JWT_SECRET"] ?? "%o@J5o02Kumnw^d@O",
    lifeTime: process.env["JWT_LIFE_TIME"] ?? "1y",
  },
});
