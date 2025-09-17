import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim())
      navigate(
        `/products/filter?keyword=${encodeURIComponent(keyword.toLowerCase())}`
      );
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="bg-white focus:outline-none py-1 ps-2 text-black text-sm rounded-2xl"
        />
        <Search
          onClick={handleSearch}
          className="absolute top-1 right-1 text-black cursor-pointer w-5 h-5 "
        />
      </form>
    </div>
  );
};

export default SearchBox;
