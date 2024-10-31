"use client";
import FormContainer from "../form/FormContainer";
import SelectProductAmount, {
  Mode,
} from "../single-product/SelectProductAmount";
import { useState } from "react";
import { removeCartItemAction, updateCartItemAction } from "@/utils/actions";
import { SubmitButton } from "../form/Buttons";
import { useToast } from "@/hooks/use-toast";

function ThirdColumn({ id, quantity }: { id: string; quantity: number }) {
  const [amount, setAmount] = useState(quantity);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  //should connect the database
  const handelAmountChange = async (value: number) => {
    setIsLoading(true);
    toast({ description: "Calculating..." });
    const result = await updateCartItemAction({
      amount: value,
      cartItemId: id,
    });
    setAmount(value);
    toast({ description: result.message });
    setIsLoading(false);
  };

  return (
    <div className="md:ml-8 ">
      <SelectProductAmount
        mode={Mode.cartItem}
        amount={quantity}
        setAmount={handelAmountChange}
        isLoading={isLoading}
      />
      <FormContainer action={removeCartItemAction}>
        <input type="hidden" name="id" value={id} />
        <SubmitButton text="remove" size="sm" className="mt-4" />
      </FormContainer>
    </div>
  );
}

export default ThirdColumn;
