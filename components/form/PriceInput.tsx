import { Label } from "../ui/label";
import { Input } from "../ui/input";

type FormInputNumberProps = {
  defaultValue?: number;
};

const name = "price";

function PriceInput({ defaultValue }: FormInputNumberProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        Price($)
      </Label>
      <Input name={name} id={name} type="number" min={0} defaultValue={defaultValue || 100} required></Input>
    </div>
  );
}

export default PriceInput;
