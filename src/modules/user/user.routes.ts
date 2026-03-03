import { Router } from "express";
import { getProfile, addAddress } from "./user.controller";
import { protect } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/profile", protect, getProfile);
router.post("/address", protect, addAddress);

export default router;