import {
  useGetFeaturedQuery,
  useGetNewArrivalsQuery,
} from "@/store/slices/productApi";
import ProductList from "../components/products/ProductList";

const Home = () => {
  const { data: newArrivals = [] } = useGetNewArrivalsQuery(undefined);
  const { data: featured = [] } = useGetFeaturedQuery(undefined);

  return (
    <main className="mt-8 space-y-10 mx-6 lg:mx-4 text-center">
      <section>
        <h2 className="text-2xl font-bold mb-6">NEW ARRIVALS</h2>
        <ProductList products={newArrivals} />
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-6">BEST DEALS</h2>
        <ProductList products={featured} />
      </section>
    </main>
  );
};

export default Home;
