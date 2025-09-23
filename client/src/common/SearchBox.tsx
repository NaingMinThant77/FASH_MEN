import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const SearchBox = () => {
  const [searchParams] = useSearchParams();
  const initialKeyword = searchParams.get("keyword") || "";
  const [keyword, setKeyword] = useState(initialKeyword || "");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateKeywordUrl(keyword.trim());
  };

  useEffect(() => setKeyword(initialKeyword), [searchParams]);

  const updateKeywordUrl = (newKeyword: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (newKeyword) newParams.set("keyword", newKeyword);
    else newParams.delete("keyword");

    const newSearchQuery = newParams.toString();
    const path = newSearchQuery
      ? `/products/filter?${newSearchQuery}`
      : "/products/filter";
    navigate(path, { replace: true });
  };
  // navigate(`/products/filter?keyword=${encodeURIComponent(newKeyword.toLowerCase())}`);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    updateKeywordUrl(e.target.value);
  };

  const handleClear = () => {
    setKeyword("");
    updateKeywordUrl("");
  };

  return (
    <div className="relative w-40 md:w-72">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          placeholder="Search products..."
          className="w-full bg-white border border-gray-300 rounded-full py-2 pl-3 pr-4 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <Search
          onClick={handleSearch}
          className={`absolute top-2.5 ${
            keyword ? "right-8" : "right-3"
          } text-gray-600 hover:text-black cursor-pointer w-5 h-5`}
        />
        {keyword && (
          <X
            onClick={handleClear}
            className="absolute top-2.5 right-3 text-red-500 hover:text-red-600 cursor-pointer w-5 h-5"
          />
        )}
      </form>
    </div>
  );
};

export default SearchBox;
