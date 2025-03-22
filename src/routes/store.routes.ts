import { Router } from "express";

import { storeController } from "../controllers";
import { validateMiddleware } from "../middleware";
import { storeSchema } from "../types";

const router = Router();

router
  .route("/stores")
  .get(storeController.list)
  .post(validateMiddleware(storeSchema, { isArray: true }), storeController.bulkCreate);

router.route("/store").post(validateMiddleware(storeSchema), storeController.create);

router
  .route("/store/:id")
  .get(storeController.fetch)
  .put(validateMiddleware(storeSchema), storeController.update)
  .delete(storeController.delete);

export default router;
