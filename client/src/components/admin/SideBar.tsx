import { PackagePlus } from "lucide-react";
import { Link, useLocation } from "react-router";

const pages = [
  {
    name: "Create Product",
    path: "/admin/create-product",
    icon: <PackagePlus className="w-5 h-5" />,
  },
];

const SideBar = () => {
  const location = useLocation();

  return (
    <nav className="flex flex-row md:flex-col w-full overflow-x-auto md:overflow-visible">
      {pages.map((page, index) => {
        const active = location.pathname === page.path;
        return (
          <Link
            key={index}
            to={page.path}
            className={`flex items-center gap-2 px-3 py-2 whitespace-nowrap border-b-2 md:border-b-0 md:border-l-4 transition
              ${
                active
                  ? "border-blue-500 text-blue-600 font-semibold bg-blue-50"
                  : "border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
          >
            {page.icon}
            <span>{page.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default SideBar;
