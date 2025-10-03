import {
  useGetFeaturedQuery,
  useGetNewArrivalsQuery,
} from "@/store/slices/productApi";
import ProductList from "../../components/products/ProductList";
import PaginationNav from "@/components/products/Pagination";
import { useState } from "react";
import Hero from "@/common/Hero";

const Home = () => {
  const [newPage, setNewPage] = useState(1);
  const [featuredPage, setFeaturedPage] = useState(1);

  const { data: newArrivals } = useGetNewArrivalsQuery({ page: newPage });
  const { data: featured } = useGetFeaturedQuery({ page: featuredPage });

  return (
    <main className="mt-8 space-y-10 mx-6 lg:mx-4 text-center">
      <section>
        <Hero />
        <h2 className="text-2xl font-bold mb-6">NEW ARRIVALS</h2>
        <ProductList products={newArrivals?.products || []} />
        <PaginationNav
          page={newArrivals?.page || 1}
          pages={newArrivals?.pages || 1}
          setPage={setNewPage}
        />
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-6">BEST DEALS</h2>
        <ProductList products={featured?.products || []} />
        <PaginationNav
          page={featured?.page || 1}
          pages={featured?.pages || 1}
          setPage={setFeaturedPage}
        />
      </section>
    </main>
  );
};

export default Home;
