"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import SelectProductAmount from "./SelectProductAmount";
import { SubmitButton } from "../form/Buttons";
import { ProductSignInButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";
import { Mode } from "./SelectProductAmount";
import { addToCartAction } from "@/utils/actions";

function AddToCart({ productId }: { productId: string }) {
  const [amount, setAmount] = useState(1);

  //client component,if server component can use auth();
  const { userId } = useAuth();

  return (
    <div className="mt-4">
      <SelectProductAmount
        mode={Mode.SingleProduct}
        amount={amount}
        setAmount={setAmount}
      />
      {userId ? (
        <FormContainer action={addToCartAction}>
          <input type="hidden" name="productId" value={productId} />
          <input type="hidden" name="amount" value={amount} />
          <SubmitButton text="add to cart" className="mt-8" />
        </FormContainer>
      ) : (
        <ProductSignInButton />
      )}
    </div>
  );
}

export default AddToCart;
