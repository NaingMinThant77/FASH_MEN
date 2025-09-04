import ProductList from "../components/products/ProductList";

const Home = () => {
  return (
    <main className="mt-8 space-y-10 mx-6 lg:mx-4 text-center">
      <section>
        <h2 className="text-2xl font-bold mb-6">NEW ARRIVALS</h2>
        <ProductList />
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-6">BEST DEALS</h2>
        <ProductList />
      </section>
    </main>
  );
};

export default Home;

// 1: 03: 08
