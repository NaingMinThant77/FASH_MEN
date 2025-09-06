import { Link } from "react-router";
import SearchBox from "../../common/SearchBox";
import { LogIn, ShoppingCart } from "lucide-react";

interface TopbarProps {
  toggleCart: () => void;
}
const Topbar = ({ toggleCart }: TopbarProps) => {
  return (
    <main className="text-white bg-black py-1">
      <div className="flex justify-between items-center p-4 max-w-6xl mx-auto">
        <h2 className="font-extrabold text-3xl font-mono">FASH_MEN</h2>
        <div className="flex gap-4">
          <SearchBox />
          <ShoppingCart onClick={toggleCart} className="cursor-pointer" />
          <Link to="/login">
            {" "}
            <LogIn className="cursor-pointer" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Topbar;
