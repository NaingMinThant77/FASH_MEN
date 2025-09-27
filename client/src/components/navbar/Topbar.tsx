import { Link, useNavigate } from "react-router";
import SearchBox from "../../common/SearchBox";
import {
  Import,
  ListOrdered,
  LogIn,
  LogOut,
  ShoppingCart,
  User2Icon,
  UserCog,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  useCurrentUserQuery,
  useLogoutMutation,
  userApiSlice,
} from "@/store/slices/userApi";
import { useEffect } from "react";
import type { RootState } from "@/store";
import { openCart } from "@/store/slices/cart";

const Topbar = () => {
  const usersData = useSelector((state: RootState) => state.auth.userInfo);
  const { data: userInfo, isError, refetch } = useCurrentUserQuery();
  const dispatch = useDispatch();
  const [logoutMutation, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    if (usersData) {
      refetch();
    }
  }, [usersData, refetch]);

  useEffect(() => {
    if (isError || !usersData) {
      dispatch(clearUserInfo());
      navigate("/");
    }
  }, [isError, usersData]);

  const logoutHandler = async () => {
    try {
      await logoutMutation({});
      dispatch(clearUserInfo());
      dispatch(userApiSlice.util.resetApiState());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to={"/"}>
          <h2 className="font-extrabold text-xl md:text-2xl font-mono tracking-wider hover:text-gray-300 transition">
            FASH_MEN
          </h2>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-2.5">
          {/* Search */}
          <SearchBox />

          {/* Cart */}
          <div
            onClick={() => dispatch(openCart())}
            className="relative cursor-pointer hover:text-gray-300 transition"
          >
            <ShoppingCart className="w-6 h-6" />
            {/* Example cart badge */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs font-bold text-white px-2 py-0.5 rounded-full">
              {products.length}
            </span>
          </div>

          {/* User */}
          {usersData ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer">
                  <Avatar className="w-9 h-9 ring-2 ring-gray-300 shadow-sm hover:scale-105 transition">
                    <AvatarImage src={userInfo?.avatar?.[0]?.url || ""} />
                    <AvatarFallback className="bg-gray-200 text-black font-bold">
                      {userInfo?.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 ring-2 ring-gray-200 shadow-sm">
                      <AvatarImage src={userInfo?.avatar?.[0]?.url || ""} />
                      <AvatarFallback className="bg-gray-200 text-black font-bold">
                        {userInfo?.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold text-blue-500">
                        {userInfo?.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {userInfo?.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User2Icon className="mr-2 w-4 h-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="flex items-center">
                      <ListOrdered className="mr-2 w-4 h-4" />
                      Orders
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:text-red-700"
                    onClick={logoutHandler}
                    disabled={isLoading}
                  >
                    <LogOut className="mr-2 w-4 h-4 text-red-600" />
                    {isLoading ? "Logging out..." : "Logout"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Admin Shortcut */}
              {userInfo?.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-3 py-2 rounded-lg flex items-center gap-1 transition"
                >
                  <UserCog className="w-4 h-4" />
                  <span className="hidden sm:inline">Admin</span>
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="flex items-center gap-1 text-gray-200 hover:text-white transition border-2 border-white px-3 py-2 rounded-lg"
              >
                <Import className="w-6 h-6" />
                <span className="hidden sm:inline font-medium">Register</span>
              </Link>

              <Link
                to="/login"
                className="flex items-center gap-1 text-gray-200 hover:text-white transition border-2 border-white px-3 py-2 rounded-lg"
              >
                <LogIn className="w-6 h-6" />
                <span className="hidden sm:inline font-medium">Login</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
