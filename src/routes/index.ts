import { Router } from "express";

import { storeController } from "../controllers";
import { authorizedGuard } from "../guards";
import { validateMiddleware, errorHandlerMiddleware } from "../middleware";
import { authSchema, storeSchema } from "../types";

import notificationRoutes from "./notification.routes";
import storeRoutes from "./store.routes";
import supplierRoutes from "./supplier.routes";
import warehouseRoutes from "./warehouse.routes";

const router = Router();

router
  .route("/ping")
  .get((_request, res) => res.status(200).send({ alive: true, timestamp: new Date().toISOString() }));

router.route("/register").post(validateMiddleware(storeSchema), storeController.create);
router.route("/authenticate").post(validateMiddleware(authSchema), storeController.authenticate);

router.use(authorizedGuard);

// ****************************************** //

router.use(storeRoutes);
router.use(warehouseRoutes);
router.use(notificationRoutes);
router.use(supplierRoutes);

// ****************************************** //

router.use(errorHandlerMiddleware);

export default router;
