import { DefaultController } from "../core";
import { notificationService } from "../services";

import type { NotificationInterface } from "../types";

class NotificationController extends DefaultController<NotificationInterface> {
  public constructor() {
    super(notificationService);
  }
}

export const notificationController = new NotificationController();
