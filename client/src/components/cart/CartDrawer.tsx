import { X } from "lucide-react";
import CartItem from "./CartItem";

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

interface CartDrawerProps {
  isCartOpen: boolean;
  toggleCart: () => void;
}

const CartDrawer = ({ isCartOpen, toggleCart }: CartDrawerProps) => {
  return (
    <section
      className={`bg-gray-300 fixed top-0 right-0 w-2/3 md:w-1/2 lg:w-1/3 h-full transform transition-transform ease-in-out duration-300 z-50 p-4 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-end w-full text-red-500">
        <X onClick={toggleCart} className="w-6 h-6 cursor-pointer" />
      </div>
      <h2 className="text-lg md:text-2xl font-bold my-4">YOUR CART</h2>
      <div className="space-y-3 h-[calc(100vh-400px)]  max-h-[calc(120vh-400px)] overflow-y-scroll pr-2 flex flex-col gap-y-4 md:h-[calc(91vh-300px)] md:max-h-[calc(91vh-300px)]">
        {products.map((product) => (
          <CartItem
            key={product.id}
            name={product.name}
            price={product.price}
            color={product.color[0]}
            size={product.size[0]}
            image={product.images[0].url}
          />
        ))}
      </div>
      <button className="bg-black text-white px-4 py-2 rounded-md mt-4 w-full ">
        Go to Checkout
      </button>
    </section>
  );
};

export default CartDrawer;
