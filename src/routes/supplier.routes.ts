import { Router } from "express";

import { supplierController } from "../controllers";
import { validateMiddleware } from "../middleware";
import { supplierSchema } from "../types";

const router = Router();

router
  .route("/suppliers")
  .post(supplierController.list)
  .post(validateMiddleware(supplierSchema, { isArray: true }), supplierController.bulkCreate);

router.route("/supplier").post(validateMiddleware(supplierSchema), supplierController.create);

router
  .route("/supplier/:id")
  .get(supplierController.fetch)
  .put(validateMiddleware(supplierSchema), supplierController.update)
  .delete(supplierController.delete);

export default router;
