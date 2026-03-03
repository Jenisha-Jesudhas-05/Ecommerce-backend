import { Router } from "express";
import { addFeatured, getFeatured } from "./featured.controller";
import { protect } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.post("/", protect, authorize("seller"), addFeatured);
router.get("/", getFeatured);

export default router;