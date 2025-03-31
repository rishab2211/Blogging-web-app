import { useState } from "react";
import Alternate from "../components/Alternate";
import Button from "../components/Button";
import Head from "../components/Head";
import LabelInput from "../components/LabelInput";
import Quote from "../components/Quote";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

type Props = {};

const Signup = (props: Props) => {
  const [postInputs, setPostInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const sendRequest = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        postInputs
      );
      console.log("RESPONSE : ", response);

      const jwt = await response.data;
      console.log("JWT : ", jwt);

      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (err: any) {
      //alert the use that the request has failed
      console.log("ERROR OCCURED :", err.message);
    }
  };
  return (
    <div className="h-screen grid  sm:grid-cols-2 ">
      <div className=" w-full flex flex-col justify-center items-center">
        <div className="w-[300px] sm:w-[350fpx]  flex flex-col gap-4">
          <Head text="Create your account now" />
          <div>
            <LabelInput
              label="Name"
              placeholder="Enter your username"
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  name: e.target.value,
                }));
              }}
            />
            <LabelInput
              label="Email"
              placeholder="Enter the email"
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  email: e.target.value,
                }));
              }}
            />
            <LabelInput
              label="Password"
              placeholder="Enter the password"
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  password: e.target.value,
                }));
              }}
            />
          </div>
          <Alternate
            text="Already have an account?"
            alternate="signin"
            alternateText="Signin"
          />
          <div className="flex justify-center">
            <Button onClick={sendRequest} text="Create account" />
          </div>
        </div>
      </div>

      <Quote
        text="The customer support i recieved was exceptional. The support team went above and beyond to address my concerns"
        author="Juliens Winfield"
      />
    </div>
  );
};

export default Signup;
