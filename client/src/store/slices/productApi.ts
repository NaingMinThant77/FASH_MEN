import type { Product, ProductMeta } from "@/types/product";
import { apiSlice } from "./api";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNewArrivals: builder.query({
      query: () => "/products/new",
    }),
    getFeatured: builder.query({
      query: () => "/products/featured",
    }),
    getProductDetail: builder.query<Product, string>({
      query: (id: string) => `/products/${id}`,
    }),
    getProducts: builder.query({
      query: ({
        sizes,
        colors,
        minPrice,
        maxPrice,
        sortBy,
        keyword,
        category,
      }) => {
        const params = new URLSearchParams();
        if (sizes && sizes.length > 0) {
          sizes.forEach((size: string) => {
            params.append("size", size);
          });
        }
        if (colors && colors.length > 0) {
          colors.forEach((color: string) => {
            params.append("color", color);
          });
        }
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (sortBy) params.append("sortBy", sortBy);
        if (keyword) params.append("keyword", keyword);
        if (category) params.append("category", category);
        return `/products?${params.toString()}`;
      },
    }),
    getProductsMeta: builder.query<ProductMeta, string>({
      query: () => `/products/filters/meta`,
    }),
    createProduct: builder.mutation<Product, FormData>({
      query: (data) => ({
        url: "/products/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    editProduct: builder.mutation<Product, { id: string; formData: FormData }>({
      query: (data) => ({
        url: `/products/edit/${data.id}`,
        method: "PUT",
        body: data.formData,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetNewArrivalsQuery,
  useGetFeaturedQuery,
  useGetProductDetailQuery,
  useGetProductsQuery,
  useGetProductsMetaQuery,
  useCreateProductMutation,
  useEditProductMutation,
} = productApiSlice;
