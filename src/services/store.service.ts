import { sign } from "jsonwebtoken";

import config from "../../config";
import { DefaultService } from "../core";
import { storeRepository } from "../database/repositories";
import { verifyHash } from "../libraries";
import { UnauthorizedException } from "../types";

import type { StoreInterface } from "../types";

class StoreService extends DefaultService<StoreInterface> {
  constructor() {
    super(storeRepository);
  }

  // ************** authentication ************** //
  authenticate = async (
    username: string,
    password: string
  ): Promise<{ client: Partial<StoreInterface>; token: string }> => {
    const client = await storeRepository.findOne({ filter: { username, isDeleted: false } });
    if (
      !client ||
      client.accessType === "DENIED" ||
      !client.password ||
      !(await verifyHash(client.password, password))
    ) {
      throw new UnauthorizedException("Incorrect username or password");
    }

    return {
      client,
      token: `Bearer ${sign({ _id: client._id }, config.jwt.secret, { expiresIn: config.jwt.lifeTime })}`,
    };
  };
}

export const storeService = new StoreService();
