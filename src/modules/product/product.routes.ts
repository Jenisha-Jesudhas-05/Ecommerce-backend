import { Router } from "express";
import { 
  createProduct, 
  getProducts, 
  updateProduct, 
  deleteProduct 
} from "./product.controller";
import { protect } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.post("/", protect, authorize("seller" ), createProduct);


router.get("/", getProducts);


router.put("/:id", protect, authorize("seller" ), updateProduct);


router.delete("/:id", protect, authorize("seller"), deleteProduct);

export default router;