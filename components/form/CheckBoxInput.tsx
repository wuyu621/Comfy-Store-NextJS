import { Checkbox } from "../ui/checkbox";

type CheckboxInputProps = {
  name: string;
  label: string;
  defaultChecked?: boolean;
};

function CheckBoxInput({ name, label, defaultChecked }: CheckboxInputProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox name={name} id={name} defaultChecked={defaultChecked} />
      <label htmlFor={name} className="text-sm leading-none capitalize">
        {label}
      </label>
    </div>
  );
}

export default CheckBoxInput;
