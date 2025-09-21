import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { productSchema, type ProductFormInputs } from "@/schema/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ImageUpload from "./ImageUpload";
import CategorySelect from "./CategorySelect";
import ColorPicker from "./ColorPicker";
import SizeSelector from "./SizeSelector";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import Tiptap from "../editor/TipTap";
import { useEffect } from "react";

interface ProductFormProps {
  initialData?: any;
  onSubmit: (data: ProductFormInputs) => void;
  isLoading: boolean;
  isUpdating?: boolean;
}

const ProductForm = ({
  initialData,
  onSubmit,
  isLoading,
  isUpdating,
}: ProductFormProps) => {
  const form = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      instock_count: 0,
      category: "",
      sizes: [],
      colors: [],
      images: [],
      is_new_arrival: false,
      is_feature: false,
      rating_count: 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        description: initialData.description,
        price: initialData.price,
        instock_count: initialData.instock_count,
        category: initialData.category,
        sizes: initialData.sizes,
        colors: initialData.colors,
        images: initialData.images.map((img: any) => ({
          url: img.url,
          public_alt: img.public_alt,
        })),
        is_new_arrival: initialData.is_new_arrival,
        is_feature: initialData.is_feature,
        rating_count: initialData.rating_count,
      });
    }
  }, [form, initialData]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-6 rounded-xl shadow-sm"
      >
        <h2 className="text-2xl font-bold text-gray-800">
          {initialData ? "Edit Product" : "Create Product"}
        </h2>
        <p className="text-sm text-gray-500">
          Fill out the product details below.
        </p>

        {/* Product Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Nike Air Max 2024" />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description</FormLabel>
              <FormControl>
                <Tiptap value={field.value} onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Sizes + Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="sizes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sizes</FormLabel>
                <FormControl>
                  <SizeSelector sizes={field.value} onChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <CategorySelect
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Price + Instock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instock_count"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Images */}
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Images</FormLabel>
              <FormControl>
                <ImageUpload images={field.value} onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Colors */}
        <FormField
          control={form.control}
          name="colors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Colors</FormLabel>
              <FormControl>
                <ColorPicker colors={field.value} onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="is_new_arrival"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <FormLabel>New Arrival</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_feature"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <FormLabel>Featured Product</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoading || isUpdating}
          className="w-full"
        >
          {isUpdating
            ? "Updating..."
            : isLoading
            ? "Saving..."
            : initialData
            ? "Update Product"
            : "Create Product"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
