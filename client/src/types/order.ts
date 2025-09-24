export type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
};

export type Order = {
  id: string;
  userId: string;
  items: OrderItem[];
  bill: number;
  status: "pending" | "paid" | "delivered" | "cancelled";
  createdAt: string;
  updatedAt: string;
  customer: string;
};
