import ProductStatusCard from "@/components/admin/ProductStatusCard";
import ProductTable from "@/components/products/ProductTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetProductsQuery } from "@/store/slices/productApi";
import type { Product } from "@/types/product";

const ProductManagement = () => {
  const {
    data: response,
    isLoading,
    error,
  } = useGetProductsQuery({}) as {
    data: Product[];
    isLoading: boolean;
    error: any;
  };

  const products = response || [];

  if (error)
    return (
      <div>
        <Card>
          <CardContent>
            <p className="text-destructive">
              Failed to load products. Please try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold">Products</h2>
        <p className="text-gray-500">
          Manage your products inventory and take action
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <ProductStatusCard
          title="Total Products"
          isLoading={isLoading}
          value={products.length}
        />
        <ProductStatusCard
          title="In Stock"
          isLoading={isLoading}
          value={products.filter((p) => p.instock_count > 0).length}
          iconColor="text-green-500"
        />
        <ProductStatusCard
          title="Low Stock"
          isLoading={isLoading}
          value={products.filter((p) => p.instock_count < 10).length}
          iconColor="text-yellow-500"
        />
        <ProductStatusCard
          title="Out of Stock"
          isLoading={isLoading}
          value={products.filter((p) => p.instock_count === 0).length}
          iconColor="text-red-500"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>
            Manage and sort your products inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductTable data={products} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductManagement;
