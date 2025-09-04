import { useParams } from "react-router";
import RatingConverter from "../common/RatingConverter";
import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";

const product = {
  id: 1,
  name: "Black T-shirt",
  price: 100,
  category: "T-shirt",
  sizes: ["S", "M", "L", "XL"],
  colors: ["red", "black", "blue"],
  rating: 4,
  description: `Experience premium sound quality and industry-leading noise
              cancellation with these wireless headphones. Perfect htmlFor music
              lovers and frequent travelers.`,
  images: [
    {
      url: "https://picsum.photos/500/300?random=1",
    },
    {
      url: "https://picsum.photos/500/300?random=2",
    },
    {
      url: "https://picsum.photos/500/300?random=3",
    },
    {
      url: "https://picsum.photos/500/300?random=4",
    },
  ],
};

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState<string | undefined>("");
  const [selectedColor, setSelectedColor] = useState<string>();
  const [selectedSize, setSelectedSize] = useState<string>();
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (product.images.length > 0) setSelectedImage(product.images[0].url);
    if (product.colors.length > 0) setSelectedColor(product.colors[0]);
    if (product.sizes.length > 0) setSelectedSize(product.sizes[0]);
  }, [product]);

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8">
            <img
              src={selectedImage}
              alt={selectedImage}
              className="w-full h-auto rounded-lg shadow-md mb-4"
              id="mainImage"
            />
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`${
                    selectedImage === image.url &&
                    "border-2 border-gray-400 w-fit rounded-xl"
                  }`}
                >
                  <img
                    key={index}
                    src={image.url}
                    alt={image.url}
                    onClick={() => setSelectedImage(image.url)}
                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">Category: {product.category}</p>
            <div className="mb-4">
              <span className="text-2xl font-bold mr-2">${product.price}</span>
            </div>
            <div className="flex items-center mb-4">
              <RatingConverter count={product.rating} />
            </div>
            <p className="text-gray-700 mb-6">{product.description}</p>

            <hr className="mt-4 text-gray-300" />
            <h2 className="text-xl font-bold my-2">Colors</h2>
            <div className="flex items-center gap-2">
              {product.colors.map((color: string, i: number) => (
                <div
                  className={`w-6 h-6 rounded-full cursor-pointer ${
                    selectedColor === color && "border-2 border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  key={i}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                />
              ))}
            </div>

            <hr className="mt-4 text-gray-300" />
            <h2 className="text-xl font-bold my-2">Sizes</h2>
            <div className="flex items-center gap-2">
              {product.sizes.map((size: string, i: number) => (
                <div
                  className={`border border-gray-400 text-gray-400 px-4 py-2 rounded-full text-sm cursor-pointer ${
                    selectedSize === size && "text-white bg-black border-black"
                  }`}
                  key={i}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>

            <hr className="mt-4 text-gray-300" />
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  className="bg-black p-2 text-white rounded-md cursor-pointer"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="font-medium">{quantity}</span>
                <button
                  className="bg-black p-2 text-white rounded-md cursor-pointer"
                  onClick={() =>
                    setQuantity((prev) => {
                      if (prev === 1) {
                        return 1;
                      }
                      return prev - 1;
                    })
                  }
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
              <button className="w-full text-center py-2 bg-black text-sm font-medium text-white rounded-full">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
