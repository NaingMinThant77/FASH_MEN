import { Link } from "react-router";
import SearchBox from "../../common/SearchBox";
import { LogIn, LogOut, ShoppingCart, User, User2Icon } from "lucide-react";
import type { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { clearUserInfo } from "@/store/slices/auth";
import { useLogoutMutation } from "@/store/slices/userApi";

interface TopbarProps {
  toggleCart: () => void;
}
const Topbar = ({ toggleCart }: TopbarProps) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch = useDispatch();
  const [logoutMutation, { isLoading }] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutMutation({});
      dispatch(clearUserInfo());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="text-white bg-black py-1">
      <div className="flex justify-between items-center p-4 max-w-6xl mx-auto">
        <Link to={"/"}>
          <h2 className="font-extrabold text-3xl font-mono">FASH_MEN</h2>
        </Link>
        <div className="flex gap-4">
          <SearchBox />
          <ShoppingCart onClick={toggleCart} className="cursor-pointer" />
          {userInfo ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer">
                <User />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <p className="font-bold text-blue-500">{userInfo.name}</p>
                    <p className="text-xs">{userInfo.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User2Icon />
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-red-600"
                  onClick={logoutHandler}
                  disabled={isLoading}
                >
                  <LogOut className="text-red-600" />{" "}
                  {isLoading ? "Logging out..." : "Logout"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <LogIn className="cursor-pointer" />
            </Link>
          )}
        </div>
      </div>
    </main>
  );
};

export default Topbar;
