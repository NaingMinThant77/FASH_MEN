import { Search } from "lucide-react";

const SearchBox = () => {
  return (
    <div className="relative">
      <form>
        <input
          type="text"
          className="bg-white focus:outline-none py-1 ps-2 text-black text-sm rounded-2xl"
        />
        <Search className="absolute top-1 right-1 text-black cursor-pointer w-5 h-5 " />
      </form>
    </div>
  );
};

export default SearchBox;
