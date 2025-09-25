import Secondarybar from "../components/navbar/Secondarybar";
import Topbar from "../components/navbar/Topbar";
import CartDrawer from "../components/cart/CartDrawer";

const Navbar = () => {
  // const toggleCart = () => { setIsCartOpen((prev) => !prev); };

  return (
    <nav>
      <Topbar />
      <Secondarybar />
      <CartDrawer />
    </nav>
  );
};

export default Navbar;
