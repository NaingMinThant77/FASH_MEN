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
  rating: number;
  images: ProductImage[];
}
