import { Button } from "@/components/ui/button";

interface SizeSelector {
  sizes: string[];
  onChange: (sizes: string[]) => void;
}

const SizeSelector = ({ sizes, onChange }: SizeSelector) => {
  const avaliableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const toggleSize = (selectedSize: string) => {
    if (sizes.includes(selectedSize))
      onChange(sizes.filter((size) => size !== selectedSize));
    else onChange([...sizes, selectedSize]);
  };

  return (
    <div>
      {avaliableSizes.map((size) => (
        <Button
          key={size}
          type="button"
          variant={sizes.includes(size) ? "default" : "secondary"}
          size="sm"
          onClick={() => toggleSize(size)}
          className="m-1"
        >
          {size}
        </Button>
      ))}
    </div>
  );
};

export default SizeSelector;
