import SearchBox from "../../common/SearchBox";
import { ShoppingCart, User } from "lucide-react";

const Topbar = () => {
  return (
    <main className="text-white bg-black py-1">
      <div className="flex justify-between items-center p-4 max-w-6xl mx-auto">
        <h2 className="font-extrabold text-3xl font-mono">FASH_MEN</h2>
        <div className="flex gap-4">
          <SearchBox />
          <ShoppingCart />
          <User />
        </div>
      </div>
    </main>
  );
};

export default Topbar;
