type Props = {
  text: string;
  author: string;
};

const Quote = ({ text, author }: Props) => {
  return (
    <div className="bg-slate-200 p-8 md:px-20 h-screen text-sm hidden sm:flex justify-center items-center">
      <div>
        <div className="sm:text-xl text-sm font-semibold">{`"${text}"`}</div>
        <div className="flex flex-col items-end">
          - {author}{" "}
          <span className=" text-slate-700 ">CEO, Acme corp</span>{" "}
        </div>
      </div>
    </div>
  );
};

export default Quote;
