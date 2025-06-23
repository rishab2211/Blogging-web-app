import { ChangeEvent } from "react";

type Props = {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  type?: string;
};

const LabelInput = ({
  type,
  label,
  placeholder,
  onChange,
  required = false,
  error = "",
}: Props) => {
  return (
    <div className="flex flex-col mt-1">
      <label htmlFor={label} className="text-lg font-semibold">
        {label}
      </label>
      <input
        type={type}
        name={label}
        onChange={onChange}
        placeholder={placeholder}
        className={`border rounded-lg p-2 focus:outline-none ${
          error ? "border-red-500" : "border-slate-500"
        }`}
        required={required}
      />
      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default LabelInput;
