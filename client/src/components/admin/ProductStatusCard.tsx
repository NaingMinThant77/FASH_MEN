import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface ProductStatusCardProps {
  title: string;
  iconColor?: string;
  isLoading: boolean;
  value: number;
}

const ProductStatusCard = ({
  title,
  iconColor = "text-muted-foreground",
  isLoading,
  value,
}: ProductStatusCardProps) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-xl">{title}</CardTitle>
        <Package className={`w-5 h-5 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoading ? <Skeleton className="w-16 h-8" /> : <span>{value}</span>}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductStatusCard;
