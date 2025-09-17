import { Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const categories = [
  "Shirt",
  "Hoodie",
  "Jeans",
  "Pants",
  "Jacket",
  "Shorts",
  "Sports",
  "Accessories",
];

const Secondarybar = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleClick = (category: string) => {
    setActiveCategory(category);
    navigate(
      `/products/filter?category=${encodeURIComponent(category.toLowerCase())}`
    );
  };
  return (
    <main className="text-white bg-black/70 py-4">
      <div className="flex flex-col gap-4 justify-center items-center px-4 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex gap-2 items-center justify-center">
          <Menu className="w-6 h-6" />
          <p className="font-extrabold text-2xl font-mono tracking-wide">
            Categories
          </p>
        </div>

        {/* Categories List */}
        <div className="flex gap-3 flex-wrap items-center justify-center font-medium text-sm mb-2">
          {categories.map((category, index) => (
            <span
              key={index}
              onClick={() => handleClick(category)}
              className={`px-4 py-2 rounded-full cursor-pointer transition duration-300 
                ${
                  activeCategory === category
                    ? "bg-white text-black shadow-md scale-105"
                    : "bg-white/10 hover:bg-white/20 hover:scale-105"
                }`}
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Secondarybar;
