import { Outlet } from "react-router";
import SideBar from "../../components/admin/SideBar";

const Panel = () => {
  return (
    <section className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <aside className="w-full md:w-64 lg:w-60 border-b md:border-r bg-white shadow-sm">
        <SideBar />
      </aside>

      {/* Content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </section>
  );
};

export default Panel;
