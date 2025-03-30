type Props = {
  text: string;
};

const Button = ({ text }: Props) => {
  return <button className=" w-full rounded-lg bg-black text-white p-1 rourded-xl">{text}</button>;
};

export default Button;
