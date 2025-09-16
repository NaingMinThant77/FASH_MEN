import { Link } from "react-router";
import RatingConverter from "../../common/RatingConverter";

interface ProductCard {
  id: string;
  name: string;
  price: number;
  image: string;
  ratingCount: number;
}

const ProductCard = ({ id, name, price, image, ratingCount }: ProductCard) => {
  return (
    <Link
      to={`/products/${id}`}
      className="bg-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <img
        src={image}
        className="rounded-lg h-60 w-full object-cover border-2 border-gray-300"
        alt={name}
      />
      <p className="font-medium mt-2">
        {name.length > 20 ? name.slice(0, 20) + "..." : name}
      </p>
      <RatingConverter count={ratingCount} />
      <p className="font-bold text-lg">${price}</p>
    </Link>
  );
};

export default ProductCard;
