export interface ProductImage {
  url: string;
  public_alt: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  instock_count: number;
  sizes: string[];
  colors: string[];
  rating_count: number;
  images: ProductImage[];
}

export interface ProductMeta {
  colors: string[];
  sizes: string[];
  maxPrice: number;
  minPrice: number;
}

export interface ProductFilter {
  keyword?: string;
  category?: string;
  minPrice?: string | null;
  maxPrice?: string | null;
  sizes?: string[];
  colors?: string[];
  sortBy?: string;
}
