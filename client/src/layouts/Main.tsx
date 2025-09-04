import { Outlet } from "react-router";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

const Main = () => {
  return (
    <section>
      <Navbar />
      <main className="max-w-6xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
};

export default Main;
