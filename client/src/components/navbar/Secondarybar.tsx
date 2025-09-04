import { Menu } from "lucide-react";

const categories = [
  "Shirt",
  "Hoodie",
  "Jeans",
  "Pants",
  "Jacket",
  "Shorts",
  "Gym",
  "Accessories",
];

const Secondarybar = () => {
  return (
    <main className="text-white bg-black/70">
      <div className="flex flex-col gap-2 justify-center items-center p-4 max-w-6xl mx-auto">
        <div className="flex gap-2 items-center justify-center">
          <Menu />
          <p className="font-extrabold text-2xl font-mono">Categories</p>
        </div>
        <div className="flex gap-4 flex-wrap items-center justify-center font-medium text-sm">
          {categories.map((category, index) => (
            <p key={index}>{category}</p>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Secondarybar;
