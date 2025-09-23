import { ChartLine, Package, PackagePlus, UserCog } from "lucide-react";
import type React from "react";
import { NavLink } from "react-router";

interface Page {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const pages: Page[] = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <ChartLine className="w-5 h-5" />,
  },
  {
    name: "Manage Products",
    path: "/admin/manage-products",
    icon: <Package className="w-5 h-5" />,
  },
  {
    name: "Create Product",
    path: "/admin/create-product",
    icon: <PackagePlus className="w-5 h-5" />,
  },
  {
    name: "Manage User",
    path: "/admin/manage-users",
    icon: <UserCog className="w-5 h-5" />,
  },
];

const SideBar = () => {
  return (
    <nav className="flex flex-row md:flex-col w-full flex-wrap md:overflow-visible">
      {pages.map((page, index) => {
        return (
          <NavLink
            key={index}
            to={page.path}
            className={({
              isActive,
            }) => `flex items-center gap-2 px-3 py-2 whitespace-nowrap border-b-2 md:border-b-0 md:border-l-4 transition
              ${
                isActive
                  ? "border-blue-500 text-blue-600 font-semibold bg-blue-50"
                  : "border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
          >
            {page.icon}
            <span>{page.name}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default SideBar;
