import { body } from "express-validator";

export const createProductValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("price").isNumeric().withMessage("Price is required"),
  body("instock_count").isInt().withMessage("Instock count must be integer"),
  body("category").notEmpty().withMessage("Category is required"),
  body("sizes").isArray().withMessage("Sizes must be array"),
  body("colors").isArray().withMessage("Colors must be array"),
  body("images").isArray().withMessage("Images must be array"),
  body("images.*.url").isString().withMessage("Image URL is required"),
  body("images.*.public_alt").isString().withMessage("Image alt is required"),
  body("is_new_arrival")
    .isBoolean()
    .withMessage("IsNewArrival must be boolean"),
  body("is_feature").isBoolean().withMessage("IsFeature must be boolean"),
  body("rating_count").isInt().withMessage("Rating count must be integer"),
];
