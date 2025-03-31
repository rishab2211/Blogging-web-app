import { ChangeEvent } from "react";

type Props = {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const LabelInput = ({ label, placeholder, onChange }: Props) => {
  return (
    <div className="flex flex-col mt-1">
      <label className="text-lg font-semibold"> {label}</label>
      <input
        onChange={onChange}
        placeholder={`${placeholder}`}
        className=" focus:outline-2 border border-slate-500 rounded-lg p-1"
      />
    </div>
  );
};

export default LabelInput;
