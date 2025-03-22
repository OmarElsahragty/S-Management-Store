import { DefaultService } from "../core";
import { notificationRepository } from "../database/repositories";

import type { NotificationInterface } from "../types";

class NotificationService extends DefaultService<NotificationInterface> {
  public constructor() {
    super(notificationRepository);
  }
}

export const notificationService = new NotificationService();
