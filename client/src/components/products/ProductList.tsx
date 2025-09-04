import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Black T-shirt",
    price: 100,
    category: "T-shirt",
    size: ["S", "M", "L", "XL"],
    color: ["Red", "Black", "Blue"],
    rating: 4,
    images: [
      {
        url: "https://picsum.photos/500/300?random=1",
      },
      {
        url: "https://picsum.photos/500/300?random=1",
      },
    ],
  },
  {
    id: 2,
    name: "Black Hoodie",
    price: 300,
    category: "Hoodie",
    size: ["S", "M", "L", "XL"],
    color: ["Red", "Black", "Blue"],
    rating: 5,
    images: [
      {
        url: "https://picsum.photos/500/300?random=3",
      },
      {
        url: "https://picsum.photos/500/300?random=4",
      },
    ],
  },
  {
    id: 3,
    name: "Taiwan Jeans",
    price: 100,
    category: "Jeans",
    size: ["S", "M", "L", "XL"],
    color: ["Red", "Black", "Blue"],
    rating: 5,
    images: [
      {
        url: "https://picsum.photos/500/300?random=5",
      },
      {
        url: "https://picsum.photos/500/300?random=6",
      },
    ],
  },
  {
    id: 4,
    name: "Shorts",
    price: 300,
    category: "Shorts",
    size: ["S", "M", "L", "XL"],
    color: ["Red", "Black", "Blue"],
    rating: 3,
    images: [
      {
        url: "https://picsum.photos/500/300?random=7",
      },
      {
        url: "https://picsum.photos/500/300?random=8",
      },
    ],
  },
  {
    id: 5,
    name: "Black Shirt",
    price: 300,
    category: "Shirt",
    size: ["S", "M", "L", "XL"],
    color: ["Red", "Black", "Blue"],
    rating: 2,
    images: [
      {
        url: "https://picsum.photos/500/300?random=9",
      },
      {
        url: "https://picsum.photos/500/300?random=10",
      },
    ],
  },
];
const ProductList = () => {
  return (
    <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          image={product.images[0].url}
          price={product.price}
          ratingCount={product.rating}
        />
      ))}
    </main>
  );
};

export default ProductList;
