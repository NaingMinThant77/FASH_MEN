import { Link } from "react-router";
import SearchBox from "../../common/SearchBox";
import { LogIn, LogOut, ShoppingCart, User, User2Icon } from "lucide-react";
import { useDispatch } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { clearUserInfo } from "@/store/slices/auth";
import { useCurrentUserQuery, useLogoutMutation } from "@/store/slices/userApi";

interface TopbarProps {
  toggleCart: () => void;
}
const Topbar = ({ toggleCart }: TopbarProps) => {
  // const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const { data: userInfo } = useCurrentUserQuery();
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
                <DropdownMenuLabel className="flex items-center gap-2">
                  <Avatar className="w-10 h-10 ring-2 ring-gray-200 shadow-sm">
                    <AvatarImage src={userInfo?.avatar?.[0].url} />
                    <AvatarFallback className="text-lg font-bold bg-gray-100">
                      {userInfo?.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <p className="font-bold text-blue-500">{userInfo.name}</p>
                      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-700">
                        {userInfo?.role}
                      </span>
                    </div>
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
