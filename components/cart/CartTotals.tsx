import { Card, CardTitle } from "@/components/ui/card";
import { Cart } from "@prisma/client";
import { Separator } from "../ui/separator";
import { formatCurrency } from "@/utils/format";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import { createOrderAction } from "@/utils/actions";

function CartTotals({ cart }: { cart: Cart }) {
  const { cartTotal, shipping, tax, orderTotal } = cart;

  return (
    <div>
      <Card className="p-8">
        <CardTotalRow label="Subtotal" amount={cartTotal} />
        <CardTotalRow label="Shipping" amount={shipping} />
        <CardTotalRow label="Tax" amount={tax} />
        <CardTitle>
          <CardTotalRow label="Order Total" amount={orderTotal} lastRow />
        </CardTitle>
      </Card>
      <FormContainer action={createOrderAction}>
        <SubmitButton text="check out" className="w-full mt-8" />
      </FormContainer>
    </div>
  );
}

function CardTotalRow({
  label,
  amount,
  lastRow,
}: {
  label: string;
  amount: number;
  lastRow?: boolean;
}) {
  return (
    <>
      <p className="flex justify-between items-center text-sm">
        <span>{label}</span>
        <span>{formatCurrency(amount)}</span>
      </p>
      {lastRow ? null : <Separator className="my-2" />}
    </>
  );
}

export default CartTotals;
