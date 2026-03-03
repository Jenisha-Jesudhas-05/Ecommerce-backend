import { Router } from "express";
import { createOrder, getMyOrders } from "./order.controller";
import { protect } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", protect, createOrder);
router.get("/", protect, getMyOrders);

export default router;