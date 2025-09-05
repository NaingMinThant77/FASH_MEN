import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product";
import { isAdmin, protect } from "../middlewares/authMiddleware";
import { createProductValidator } from "../validators/product";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

router.post(
  "/create",
  protect,
  isAdmin,
  createProductValidator,
  validateRequest,
  createProduct
);
router.put("/update/:id", protect, isAdmin, updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);

export default router;
