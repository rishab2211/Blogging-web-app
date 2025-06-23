import { useState } from "react";
import Alternate from "../components/Alternate";
import Button from "../components/Button";
import Head from "../components/Head";
import LabelInput from "../components/LabelInput";
import Quote from "../components/Quote";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [postInputs, setPostInputs] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!postInputs.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!postInputs.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const sendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        postInputs
      );

      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (err: any) {
      console.log("ERROR OCCURRED:", err.message);
      
    }
  };

  return (
    <div className="h-screen grid sm:grid-cols-2">
      <div className="w-full flex flex-col justify-center items-center">
        <form
          onSubmit={sendRequest}
          className="w-full flex flex-col justify-center items-center"
        >
          <div className="w-[300px] md:w-[350px] flex flex-col gap-4">
            <Head text="Enter details to continue" />
            <div>
              <LabelInput
                label="Email"
                placeholder="Enter your email"
                required
                onChange={(e) =>
                  setPostInputs((c) => ({
                    ...c,
                    email: e.target.value,
                  }))
                }
                error={errors.email}
              />
              <LabelInput
                label="Password"
                placeholder="Enter the password"
                required
                type="password"
                onChange={(e) =>
                  setPostInputs((c) => ({
                    ...c,
                    password: e.target.value,
                  }))
                }
                error={errors.password}
              />
            </div>
            <Alternate
              text="Don't have an account?"
              alternate="signup"
              alternateText="Signup"
            />
            <div className="flex justify-center">
              <Button type="submit" text="Login" onClick={sendRequest} />
            </div>
          </div>
        </form>
      </div>

      <Quote
        text="The customer support I received was exceptional. The support team went above and beyond to address my concerns."
        author="Juliens Winfield"
      />
    </div>
  );
};

export default Signin;
