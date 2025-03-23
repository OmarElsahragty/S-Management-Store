import { Router } from "express";

import { notificationController } from "../controllers";
import { validateMiddleware } from "../middleware";
import { notificationSchema } from "../types";

const router = Router();

router
  .route("/notifications")
  .get(notificationController.list)
  .post(
    validateMiddleware(notificationSchema, { isArray: true }),
    notificationController.bulkCreate
  );

router
  .route("/notification")
  .post(validateMiddleware(notificationSchema), notificationController.create);

router
  .route("/notification/:id")
  .get(notificationController.fetch)
  .put(validateMiddleware(notificationSchema), notificationController.update)
  .delete(notificationController.delete);

export default router;
