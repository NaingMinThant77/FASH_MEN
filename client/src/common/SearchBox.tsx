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
    <div className="relative">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          className="bg-white focus:outline-none py-1 ps-2 text-black text-sm rounded-2xl"
        />
        <Search
          onClick={handleSearch}
          className={`absolute top-1 ${
            keyword ? "right-6" : "right-1"
          }  text-black cursor-pointer w-5 h-5 `}
        />
        {keyword && (
          <X
            onClick={handleClear}
            className="absolute top-1 right-1 text-red-600 cursor-pointer w-5 h-5"
          />
        )}
      </form>
    </div>
  );
};

export default SearchBox;
