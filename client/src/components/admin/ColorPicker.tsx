import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";

interface ColorPickerProps {
  colors: string[];
  onChange: (colors: string[]) => void;
}

const ColorPicker = ({ colors, onChange }: ColorPickerProps) => {
  const [inputColor, setInputColor] = useState("#000000");

  const addColor = () => {
    if (!colors.includes(inputColor)) onChange([...colors, inputColor]);
  };

  const removeColor = (selectColor: string) => {
    onChange(colors.filter((color) => color !== selectColor));
  };

  return (
    <div className="space-y-4 p-4 rounded-xl border bg-card shadow-sm">
      {/* Input + Add button */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <Input
          type="color"
          value={inputColor}
          onChange={(e) => setInputColor(e.target.value)}
          className="w-full sm:w-40 h-10 p-1 cursor-pointer rounded-lg border"
        />
        <Button
          type="button"
          size="sm"
          onClick={addColor}
          className="px-4 bg-pink-400 hover:bg-pink-500 w-full sm:w-auto"
        >
          Add Color
        </Button>
      </div>

      {/* Color List */}
      {colors.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {colors.map((color, index) => (
            <div
              key={index}
              className="relative flex items-center gap-2 px-3 py-2 rounded-lg border shadow-sm bg-background hover:shadow-md transition"
            >
              <div
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs font-medium truncate">{color}</span>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => removeColor(color)}
                className="h-6 w-6 p-0 hover:bg-red-100 absolute top-1 right-1"
              >
                <X size={14} className="text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
