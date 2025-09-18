import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getFeaturedProducts,
  getNewArrivalProducts,
  getProductById,
  getProductsMeta,
  getProductsWithFilters,
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

router.get("/", getProductsWithFilters);

router.get("/new", getNewArrivalProducts);

router.get("/featured", getFeaturedProducts);

router.get("/:id", getProductById);

router.get("/filters/meta", getProductsMeta);

export default router;
