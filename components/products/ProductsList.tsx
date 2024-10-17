import { formatCurrency } from "@/utils/priceFormat";
import { Product } from "@prisma/client";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import FavoriteToggleButton from "./FavoriteToggleButton";

function ProductsList({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-y-8 pt-12">
      {products.map((product) => {
        const { name, image, price, company } = product;
        const productId = product.id;
        const dollarsAmount = formatCurrency(price);

        return (
          <article key={productId} className="group relative">
            <Link href={`/products/${productId}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500 ">
                <CardContent className="p-8 grid gap-y-4 md:grid-cols-3">
                  <div className="relative h-64 md:h-48 md:w-48">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                      priority
                      className="w-full rounded-md object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold capitalize">{name}</h2>
                    <h4 className=" text-muted-foreground">{company}</h4>
                  </div>
                  <p className="text-lg text-muted-foreground md:ml-auto ">
                    {dollarsAmount}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute right-8 bottom-8 z-5">
              <FavoriteToggleButton></FavoriteToggleButton>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default ProductsList;
