import RatingConverter from "../../common/RatingConverter";

interface ProductCard {
  name: string;
  price: number;
  image: string;
  ratingCount: number;
}

const ProductCard = ({ name, price, image, ratingCount }: ProductCard) => {
  return (
    <div className="bg-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
      <img src={image} className="rounded-lg" alt={name} />
      <p className="font-medium mt-2">{name}</p>
      <RatingConverter count={ratingCount} />
      <p className="font-bold text-lg">${price}</p>
    </div>
  );
};

export default ProductCard;
