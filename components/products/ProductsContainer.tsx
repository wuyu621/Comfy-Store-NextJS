import { fetchAllProducts } from "@/utils/actions";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { LuLayoutGrid, LuList } from "react-icons/lu";
import Link from "next/link";

async function ProductsContainer({
  layout,
  search,
}: {
  layout: string;
  search: string;
}) {
  const searchTerm = search ? `&search=${search}` : "";
  const products = await fetchAllProducts({ search });
  const totalProducts = products.length;
  return (
    <>
      {/* Header */}
      <section>
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-lg">
            {totalProducts} product{totalProducts > 1 && `s`}
          </h4>
          <div className="flex gap-x-4">
            <Button
              asChild
              size="icon"
              variant={layout === "grid" ? "default" : "ghost"}
            >
              <Link href={`/products?layout=grid${searchTerm}`}>
                <LuLayoutGrid />
              </Link>
            </Button>
            <Button
              asChild
              size="icon"
              variant={layout === "list" ? "default" : "ghost"}
            >
              <Link href={`/products?layout=list${searchTerm}`}>
                <LuList />
              </Link>
            </Button>
          </div>
        </div>
        <Separator className="mt-4" />
      </section>
      {/* Products */}
      <div>
        {totalProducts === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no products matched your search...
          </h5>
        ) : layout === "grid" ? (
          <ProductsGrid products={products} />
        ) : (
          <ProductsList products={products} />
        )}
      </div>
    </>
  );
}

export default ProductsContainer;
