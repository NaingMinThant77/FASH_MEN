import {
  useEditProductMutation,
  useGetProductDetailQuery,
} from "@/store/slices/productApi";
import ProductForm from "../../components/admin/ProductForm";
import { toast } from "sonner";
import type { ProductFormInputs } from "@/schema/product";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

const ProductEdit = () => {
  const { id } = useParams();
  const {
    data: initialData,
    isLoading,
    isError,
  } = useGetProductDetailQuery(id as string);
  const navigate = useNavigate();

  const [editProductMutation, { isLoading: isUpdating }] =
    useEditProductMutation();

  useEffect(() => {
    if (isError || !id) {
      navigate("/admin");
    }
  }, [isError]);

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

      // separate existing images and new images
      const existingImages = data?.images.filter(
        (img) => !img.file && img.url && img.public_alt
      );
      const newImages = data?.images.filter((img) => img.file);
      formData.append("existingImages", JSON.stringify(existingImages));
      newImages.forEach((img) => {
        if (img.file) {
          formData.append("images", img.file as File);
        }
      });

      await editProductMutation({
        id: id as string,
        formData,
      }).unwrap();
      toast.success("Product updated successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to edit product");
    }
  };

  return (
    <ProductForm
      onSubmit={onSubmit}
      initialData={initialData}
      isLoading={isLoading}
      isUpdating={isUpdating}
    />
  );
};

export default ProductEdit;
