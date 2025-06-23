import { HTMLInputTypeAttribute, MouseEventHandler } from "react";

type Props = {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  type: "button" | "reset" | "submit" | undefined;
};

const Button = ({ text, onClick, type }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-3/4 hover:bg-black/70 hover:-translate-1 transition-all rounded-lg bg-black text-white p-1 rourded-xl"
    >
      {text}
    </button>
  );
};

export default Button;
