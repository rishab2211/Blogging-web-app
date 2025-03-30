type Props = {
  label: string;
  placeholder: string;
};

const LabelInput = ({ label, placeholder }: Props) => {
  return (
    <div className="flex flex-col  ">
      <label className="text-lg font-semibold"> {label}</label>
      <input
        placeholder={`${placeholder}`}
        className=" focus:outline-2 border rounded-lg p-1"
      />
    </div>
  );
};

export default LabelInput;
