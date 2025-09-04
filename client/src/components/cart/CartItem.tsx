import { Minus, Trash2 } from "lucide-react";

interface CartItemProps {
  name: string;
  size: string;
  color: string;
  price: number;
  image: string;
}

const CartItem = ({ name, size, color, price, image }: CartItemProps) => {
  return (
    <section className="flex  justify-between border-b pb-3 ">
      <div className="flex gap-2 items-center ">
        <img
          src={image}
          alt={name}
          className="w-18 h-18 md:w-22 md:h-22 rounded-md"
        />
        <div className="flex flex-col text-sm">
          <span className="font-bold">{name}</span>
          <span className="text-xs font-medium text-gray-400">
            size - {size}
          </span>
          <span className="text-xs font-medium text-gray-400">
            color - {color}
          </span>
          <span className="font-bold mt-1">${price}</span>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between gap-2 mr-2 md:mr-4">
        <Trash2 className="w-5 h-5 text-red-600" />
        <div className="flex items-center gap-1">
          <button className="bg-black text-white px-2 rounded-md">+</button>
          <span>1</span>
          <button className="bg-black text-white py-2 px-2 rounded-md">
            <Minus className="w-2 h-2 " />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartItem;
