import type { Product } from "@/types/product";
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
        size,
        color,
        minPrice,
        maxPrice,
        sortBy,
        keyword,
        category,
      }) => {
        const params = new URLSearchParams();
        if (size) params.append("size", size);
        if (color) params.append("color", color);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (sortBy) params.append("sortBy", sortBy);
        if (keyword) params.append("keyword", keyword);
        if (category) params.append("category", category);
        return `/products?${params.toString()}`;
      },
    }),
  }),
});

export const {
  useGetNewArrivalsQuery,
  useGetFeaturedQuery,
  useGetProductDetailQuery,
  useGetProductsQuery,
} = productApiSlice;
