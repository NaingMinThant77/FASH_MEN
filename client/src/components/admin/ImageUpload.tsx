import { Button } from "@/components/ui/button";
import { X, Upload } from "lucide-react";
import { useRef } from "react";

interface Image {
  url: string;
  file?: File;
  public_alt?: string;
}

interface ImageUploadProps {
  images: Array<Image>;
  onChange: (image: Array<Image>) => void;
}

const ImageUpload = ({ images, onChange }: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      public_alt: file.name,
    }));

    onChange([...images, ...newImages]);
  };

  const removeImage = (index: number) => {
    if (images[index]?.url?.startsWith("blob:")) {
      URL.revokeObjectURL(images[index].url);
    }
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* url Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group rounded-lg overflow-hidden shadow"
            >
              <img
                src={image.url ? image.url : image.url}
                alt={image.public_alt}
                className={`w-full h-32 object-cover ${
                  image.file ? "border-2 border-pink-600" : ""
                }`}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <Button
                  type="button"
                  size="icon"
                  className="bg-red-500 text-white rounded-full hover:bg-red-600"
                  onClick={() => removeImage(index)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Box */}
      <div
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer border-2 border-dashed border-gray-300 hover:border-pink-400 rounded-lg h-32 flex flex-col items-center justify-center text-gray-500 hover:text-pink-500 transition"
      >
        <Upload className="w-8 h-8 mb-2" />
        <p className="text-sm font-medium">Click or Drop Images</p>
        <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
      </div>

      {/* Hidden Input */}
      <input
        ref={inputRef}
        id="image-upload"
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
