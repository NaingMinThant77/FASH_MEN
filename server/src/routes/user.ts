import { Router } from "express";
import { login, logout, registerUser, uploadAvatar } from "../controllers/user";
import {
  loginValidator,
  registerValidator,
  uploadImageValidator,
} from "../validators/user";
import { validateRequest } from "../middlewares/validateRequest";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", registerValidator, validateRequest, registerUser);
router.post("/login", loginValidator, validateRequest, login);
router.post("/logout", logout);

router.post(
  "/upload",
  protect,
  uploadImageValidator,
  validateRequest,
  uploadAvatar
);

export default router;
