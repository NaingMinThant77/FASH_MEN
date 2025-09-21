import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategorySelectProps {
  value?: string;
  onChange: (value: string) => void;
}

const CATEGORIES = [
  { id: "t-shirt", name: "T-Shirt" },
  { id: "hoodie", name: "Hoodie" },
  { id: "jeans", name: "Jeans" },
  { id: "pants", name: "Pants" },
  { id: "jacket", name: "Jacket" },
  { id: "short", name: "Short" },
  { id: "sports", name: "Sports" },
  { id: "shoe", name: "Shoe" },
];

const CategorySelect = ({ value, onChange }: CategorySelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {CATEGORIES.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;
