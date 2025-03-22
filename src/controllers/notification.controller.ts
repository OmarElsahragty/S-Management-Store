import { DefaultController } from "../core";
import { notificationService } from "../services";

import type { NotificationInterface } from "../types";

class NotificationController extends DefaultController<NotificationInterface> {
  constructor() {
    super(notificationService);
  }
}

export default new NotificationController();
