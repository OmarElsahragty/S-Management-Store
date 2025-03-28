import { DefaultRepository } from "../../core";
import { notificationModel } from "../models";

import type { NotificationInterface } from "../../types";

class NotificationRepository extends DefaultRepository<NotificationInterface> {
  public constructor() {
    super(notificationModel);
  }
}
export const notificationRepository = new NotificationRepository();
