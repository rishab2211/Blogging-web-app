import { Link } from "react-router-dom";

type Props = {
  text: string;
  alternate: string;
  alternateText : string
};

const Alternate = ({ text, alternate,alternateText }: Props) => {
  return (
    <div className="flex gap-2 items-center justify-center">
      <div className="text-muted-foreground text-sm">{text}</div>
      <Link className="hover:underline" to={`/${alternate}`}>{alternateText}</Link>
    </div>
  );
};

export default Alternate;
