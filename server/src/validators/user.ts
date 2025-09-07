import { body } from "express-validator";

export const loginValidator = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const registerValidator = [
  body("name").notEmpty().withMessage("name is required"),
  body("email").isEmail().withMessage("Email must be valid"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const uploadImageValidator = [
  body("image_url").notEmpty().withMessage("Image is required"),
];

export const emailUpdateValidator = [
  body("email").isEmail().withMessage("Email must be valid"),
];
