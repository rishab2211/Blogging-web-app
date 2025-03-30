import Alternate from "../components/Alternate";
import Button from "../components/Button";
import Head from "../components/Head";
import LabelInput from "../components/LabelInput";
import Quote from "../components/Quote";

type Props = {};

const Signup = (props: Props) => {
  return (
    <div className="h-screen grid  sm:grid-cols-2 ">
      <div className=" w-full flex flex-col justify-center items-center">
        <div className="w-[300px] sm:w-[350fpx]  flex flex-col gap-4" >
          <Head text="Enter details to continue" />
          <div>

            <LabelInput label="Name" placeholder="Enter your username" />
            <LabelInput label="Email" placeholder="Enter the email" />
            <LabelInput label="Password" placeholder="Enter the password" />
          </div>
          <Alternate
            text="Already have an account?"
            alternate="signin"
            alternateText="Signin"
          />
          <Button text="Create account" />
        </div>
      </div>

      <Quote text="something something something something" author="someone" />
    </div>
  );
};

export default Signup;
