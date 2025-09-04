import { useState } from "react";
import Secondarybar from "../components/navbar/Secondarybar";
import Topbar from "../components/navbar/Topbar";
import CartDrawer from "../components/cart/CartDrawer";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <nav>
      <Topbar toggleCart={toggleCart} />
      <Secondarybar />
      <CartDrawer isCartOpen={isCartOpen} toggleCart={toggleCart} />
    </nav>
  );
};

export default Navbar;
