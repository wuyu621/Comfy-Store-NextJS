import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

export enum Mode {
  SingleProduct = "singleProduct",
  cartItem = "cartItem",
}

type SelectProductAmountProps = {
  mode: Mode.SingleProduct;
  amount: number;
  setAmount: (value: number) => void;
};
type SelectCartItemAmountProps = {
  mode: Mode.cartItem;
  amount: number;
  setAmount: (value: number) => Promise<void>;
  isLoading: boolean;
};

function SelectProductAmount(
  props: SelectProductAmountProps | SelectCartItemAmountProps
) {
  const { mode, amount, setAmount } = props;
  const cartItem = mode === Mode.cartItem;

  return (
    <>
      <h4 className="mb-2">Amount: </h4>

      <Select
        defaultValue={amount.toString()}
        disabled={cartItem ? props.isLoading : false}
        onValueChange={(value) => {
          setAmount(Number(value));
        }}
      >
        <SelectTrigger className={cartItem ? "w-[80px]" : "w-[150px]"}>
          <SelectValue placeholder={amount} />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: cartItem ? amount + 10 : 10 }, (_, index) => {
            const selectValue = (index + 1).toString();
            return (
              <SelectItem key={index} value={selectValue}>
                {selectValue}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
}

export default SelectProductAmount;
