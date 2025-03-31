import { MouseEventHandler } from "react";

type Props = {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ text, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="w-3/4 hover:bg-black/70 hover:-translate-x-0.5 hover:transalte-y-0.5 transition-all rounded-lg bg-black text-white p-1 rourded-xl"
    >
      {text}
    </button>
  );
};

export default Button;
