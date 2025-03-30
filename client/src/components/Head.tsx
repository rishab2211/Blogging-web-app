type Props = {
  text: string;
};

const Head = ({ text }: Props) => {
  return <div className=" font-bold text-3xl ">{text}</div>;
};

export default Head;
