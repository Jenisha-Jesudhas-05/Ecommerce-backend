import { Router } from "express";
import { addToCart, getCart, removeFromCart } from "./cart.controller";
import { protect } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.post("/", protect, authorize("buyer"), addToCart);
router.get("/", protect, authorize("buyer"), getCart);
router.delete("/:productId", protect, authorize("buyer"), removeFromCart);

export default router;