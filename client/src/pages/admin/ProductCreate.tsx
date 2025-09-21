import { useCreateProductMutation } from "@/store/slices/productApi";
import ProductForm from "../../components/admin/ProductForm";
import { toast } from "sonner";
import type { ProductFormInputs } from "@/schema/product";
import { useNavigate } from "react-router";

const ProductCreate = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: ProductFormInputs) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", String(data.price));
      formData.append("instock_count", String(data.instock_count));
      formData.append("category", data.category);
      formData.append("is_feature", String(data.is_feature));
      formData.append("is_new_arrival", String(data.is_new_arrival));
      formData.append("rating_count", String(data.rating_count));

      // arrays
      data.colors.forEach((c) => formData.append("colors[]", c));
      data.sizes.forEach((s) => formData.append("sizes[]", s));

      // files
      data.images.forEach((img) => {
        if (img.file) {
          formData.append("images", img.file as File);
        }
      });

      await createProduct(formData).unwrap();
      toast.success("Product created successfully");
      navigate("/");
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "data" in error) {
        const err = error as {
          data: {
            errors?: { msg: string }[];
            message?: string;
          };
        };

        if (err.data.errors && err.data.errors.length > 0) {
          toast.error(err.data.errors[0].msg);
        } else if (err.data.message) {
          toast.error(err.data.message);
        } else {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return <ProductForm onSubmit={onSubmit} isLoading={isLoading} />;
};

export default ProductCreate;
