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
  }),
});

export const {
  useGetNewArrivalsQuery,
  useGetFeaturedQuery,
  useGetProductDetailQuery,
} = productApiSlice;
