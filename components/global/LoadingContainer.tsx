import { Skeleton } from "../ui/skeleton";
import { Card, CardContent } from "../ui/card";

function LoadingProduct() {
  return (
    <Card>
      <CardContent className="p-4">
        {/* same style with image */}
        <Skeleton className="h-64 w-full md:h-48" />
        {/* same style with name */}
        <Skeleton className="mt-4 h-4 w-3/4" />
        {/* same style with price */}
        <Skeleton className="mt-4 h-4 w-1/2" />
      </CardContent>
    </Card>
  );
}
function LoadingContainer() {
  return (
    <div className="grid gap-4 pt-12 md:grid-cols-2 lg:grid-cols-3">
      <LoadingProduct />
      <LoadingProduct />
      <LoadingProduct />
    </div>
  );
}

export default LoadingContainer;
