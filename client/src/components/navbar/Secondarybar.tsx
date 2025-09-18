import { Menu } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";

const categories = [
  "T-Shirt",
  "Hoodie",
  "Jeans",
  "Pants",
  "Jacket",
  "Short",
  "Sports",
  "Shoe",
];

const Secondarybar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");

  const handleClick = (category: string) => {
    const newParams = new URLSearchParams(searchParams);
    const categoryLower = category.toLocaleLowerCase();
    if (activeCategory === categoryLower) newParams.delete("category");
    else {
      newParams.set("category", categoryLower);
    }

    const newSearchQuery = newParams.toString();
    const path = newSearchQuery
      ? `/products/filter?${newSearchQuery}`
      : "/products/filter";
    navigate(path, { replace: true });
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
                  activeCategory === category.toLocaleLowerCase()
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
