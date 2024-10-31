import CartTotals from "@/components/cart/CartTotals";
import CartItemsList from "@/components/cart/CartItemsList";
import SectionTitle from "@/components/global/SectionTitle";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchOrCreateCart } from "@/utils/actions";
import { updateCart } from "@/utils/actions";

async function CartPage() {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  const previousCart = await fetchOrCreateCart({ userId });

  const { currentCart, cartItems } = await updateCart(previousCart);

  // console.log(previousCart);
  // console.log(currentCart);

  if (previousCart.numItemsInCart === 0)
    return <SectionTitle text="Empty cart" />;

  return (
    <>
      <SectionTitle text="shopping cart" />
      <div className="grid mt-8 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList cartItems={cartItems} />
        </div>
        <div className="lg:col-span-4">
          <CartTotals cart={currentCart} />
        </div>
      </div>
    </>
  );
}

export default CartPage;
