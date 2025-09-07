import { Star } from "lucide-react";

interface RatingConverterProp {
  count: number;
}

const RatingConverter = ({ count }: RatingConverterProp) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-1">
      {Array.from({ length: count }).map((_, index) => (
        <Star key={index} className="fill-yellow-400 text-yellow-400 w-5 h-5" />
      ))}
    </div>
  );
};

export default RatingConverter;
