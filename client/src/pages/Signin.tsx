import Alternate from "../components/Alternate";
import Button from "../components/Button";
import Head from "../components/Head";
import LabelInput from "../components/LabelInput";
import Quote from "../components/Quote";

type Props = {};

const Signin = (props: Props) => {
  return (
    <div className="h-screen grid  sm:grid-cols-2 ">
      <div className=" w-full flex flex-col justify-center items-center">
        <div className="w-[400px] flex flex-col gap-4" >
          <Head text="Enter details to continue" />
          <div>
            <LabelInput label="Username" placeholder="Enter your username" />
            <LabelInput label="Password" placeholder="Enter the password" />
          </div>
          <Alternate
            text="Don't have an account?"
            alternate="signup"
            alternateText="Signup"
          />
          <Button text="Login" />
        </div>
      </div>

      <Quote text="something something something something" author="someone" />
    </div>
  );
};

export default Signin;
