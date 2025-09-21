import { Star } from "lucide-react";

interface RatingConverterProp {
  count: number;
}

const RatingConverter = ({ count }: RatingConverterProp) => {
  return (
    <div className="flex items-center gap-1">
      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      <span className="text-sm text-gray-600">Rating - ({count})</span>
    </div>
  );
};

export default RatingConverter;
