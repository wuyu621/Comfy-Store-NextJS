import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/utils/format";

export function FirstColumn({ image, name }: { image: string; name: string }) {
  return (
    <div className="relative w-24 h-24 sm:w-32 sm:h-32">
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
        priority
        className="rounded-md object-cover"
      />
    </div>
  );
}

export function SecondColumn({
  name,
  company,
  productId,
}: {
  name: string;
  company: string;
  productId: string;
}) {
  return (
    <div className="sm:w-48">
      <Link href={`/products/${productId}`}>
        <h3 className="font-medium capitalize hover:underline">{name}</h3>
      </Link>
      <h2 className="mt-2 capitalize text-xs">{company}</h2>
    </div>
  );
}

export function FourthColumn({ price }: { price: number }) {
  return <p className="font-medium md:ml-auto">{formatCurrency(price)}</p>;
}
