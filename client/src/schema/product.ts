import { z } from "zod";

const IMAGES_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

export const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Product name must be at least 3 characters long." }),
  description: z.string().min(10, {
    message: "Product description must be at least 10 characters long.",
  }),
  price: z.number().min(0, { message: "Price must be greater than 0." }),
  instock_count: z.number(),
  category: z.string().min(1, { message: "Category is required." }),
  sizes: z
    .array(z.string())
    .min(1, { message: "At least one size is required." }),
  colors: z.array(z.string()).min(1, "At least one color is required"),
  images: z
    .array(
      z.object({
        file: z.instanceof(File).optional(),
        url: z.string(),
        public_alt: z.string().optional(),
      })
    )
    .min(1, { message: "At least one image is required." }),
  is_new_arrival: z.boolean(),
  is_feature: z.boolean(),
  rating_count: z
    .number()
    .min(0, { message: "Rating count must be greater than 0." }),
});

export type ProductFormInputs = z.infer<typeof productSchema>;
