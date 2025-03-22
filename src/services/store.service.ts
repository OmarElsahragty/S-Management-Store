import { sign } from "jsonwebtoken";

import config from "../../config";
import { DefaultService } from "../core";
import { storeRepository } from "../database/repositories";
import { verifyHash } from "../libraries";
import { UnauthorizedException } from "../types";

import type { StoreInterface } from "../types";

class StoreService extends DefaultService<StoreInterface> {
  public constructor() {
    super(storeRepository);
  }

  // ************** authentication ************** //
  public authenticate = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<{ store: Partial<StoreInterface>; token: string }> => {
    const store = await storeRepository.findOne({ filter: { username, isDeleted: false } });
    if (!store || store.accessType === "DENIED" || !store.password || !(await verifyHash(store.password, password))) {
      throw new UnauthorizedException("Incorrect username or password");
    }

    return {
      store,
      token: `Bearer ${sign({ _id: store._id }, config.jwt.secret, { expiresIn: config.jwt.lifeTime })}`,
    };
  };
}

export const storeService = new StoreService();
