type Props = {
  text: string;
  author: string;
};

const Quote = ({ text, author }: Props) => {
  return (
    <div className="bg-slate-200 p-4 h-screen text-sm hidden sm:flex justify-center items-center">
      <div>
        <div className="sm:text-xl text-sm font-semibold">{`"${text}"`}</div>
        <div className="flex justify-end">- {author}</div>
      </div>
    </div>
  );
};

export default Quote;
