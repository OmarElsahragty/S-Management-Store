import { Router } from "express";

import { warehouseController } from "../controllers";
import { validateMiddleware } from "../middleware";
import { warehouseSchema } from "../types";

const router = Router();

router
  .route("/warehouses")
  .post(warehouseController.list)
  .post(validateMiddleware(warehouseSchema, { isArray: true }), warehouseController.bulkCreate);

router.route("/warehouse").post(validateMiddleware(warehouseSchema), warehouseController.create);

router
  .route("/warehouse/:id")
  .get(warehouseController.fetch)
  .put(validateMiddleware(warehouseSchema), warehouseController.update)
  .delete(warehouseController.delete);

export default router;
