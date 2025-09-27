import { body, param } from "express-validator";
import mongoose from "mongoose";

export const deleteProductValidator = [
  param("id")
    .notEmpty()
    .withMessage("Product ID is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid product ID"),
];
