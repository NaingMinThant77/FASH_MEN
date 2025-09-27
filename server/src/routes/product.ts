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
import { upload } from "../utils/upload";
import { deleteProductValidator } from "../validators/product";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

router.post("/create", protect, isAdmin, upload.array("images"), createProduct);
router.put(
  "/edit/:id",
  protect,
  isAdmin,
  upload.array("images"),
  updateProduct
);
router.delete(
  "/:id",
  protect,
  isAdmin,
  deleteProductValidator,
  validateRequest,
  deleteProduct
);

router.get("/", getProductsWithFilters);

router.get("/new", getNewArrivalProducts);

router.get("/featured", getFeaturedProducts);

router.get("/:id", getProductById);

router.get("/filters/meta", getProductsMeta);

export default router;
